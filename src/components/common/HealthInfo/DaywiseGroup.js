import _ from 'lodash';
import {
  identifyFirstParent,
  baseEntities,
  processingOrder,
  getFormattedDateString,
  resourceDateFormatter,
  identifyParentOfType
} from './FhirResourcesUtils';
import { BundleContext } from './BundleContext';
import {
  CompositionProcessor,
  ImagingStudyProcessor,
  DiagnosticReportProcessor,
  MedicationRequestProcessor,
  DocumentReferenceProcessor,
  ConditionProcessor,
  EncounterProcessor,
  AllergyProcessor,
  ImmunizationProcessor
} from './FhirResourceProcessors';

class HealthInfoProcessor {
  filterByHipId(entriesByHips, hipId) {
    return entriesByHips.filter(e => e.hipId === hipId);
  }

  groupByHip(entries) {
    const entriesByHips = [];
    const errorEntries = [];
    entries.forEach(entry => {
      if (entry.status === 'SUCCEEDED') {
        let entryByHip;
        const hipEntries = this.filterByHipId(entriesByHips, entry.hipId);
        if (hipEntries && hipEntries.length > 0) {
          entryByHip = hipEntries[0];
        }
        if (entryByHip == undefined) {
          entryByHip = {
            hipId: entry.hipId,
            hipName: entry.hipName,
            bundles: []
          };
          entriesByHips.push(entryByHip);
          if (entry.data) {
            entryByHip.bundles.push(entry.data);
          }
        } else if (entry.data) {
          entryByHip.bundles.push(entry.data);
        }
      } else {
        errorEntries.push(entry);
      }
    });
    if (errorEntries.length > 0) {
      console.log('Error: Some HIP entries had error status', errorEntries);
    }
    return entriesByHips;
  }

  getCompositionEntryFromBundle(bundle) {
    return bundle.entry.find(
      e => e.resource.resourceType.toLowerCase() === 'composition'
    );
  }

  addResourceEntryForDate(dateStr, hipRef, resource, hipEntriesByDate) {
    const entryByDate = hipEntriesByDate.find(e => e.date === dateStr);

    if (entryByDate) {
      const hipEntry = entryByDate.hipData.find(e => e.hipId === hipRef.hipId);
      if (!hipEntry) {
        var hipRecord = {
          hipId: hipRef.hipId,
          hipName: hipRef.hipName,
          data: [resource]
        };
        entryByDate.hipData.push(hipRecord);
      } else {
        hipEntry.data.push(resource);
      }
    } else {
      var hipRecord = {
        hipId: hipRef.hipId,
        hipName: hipRef.hipName,
        data: [resource]
      };
      const newEntryByDate = { date: dateStr, hipData: [hipRecord] };
      hipEntriesByDate.push(newEntryByDate);
    }
  }

  sortBundleEntryForProcessing(bundle) {
    bundle.entry.sort((a, b) => {
      var a = processingOrder.indexOf(a.resource.resourceType.toLowerCase());
      var b = processingOrder.indexOf(b.resource.resourceType.toLowerCase());
      return a < b ? -1 : a === b ? 0 : 1;
    });
  }

  getResourceProcessor(entry) {
    return fhirProcessors.find(p => p.supports(entry.resource));
  }

  groupByDay(entriesByHips) {
    const hipEntriesByDate = [];
    const unresolvedEntries = [];
    entriesByHips.forEach(entryByHip => {
      entryByHip.bundles.forEach(bundle => {
        if (bundle.type.toLowerCase() === 'document') {
          const compositionEntry = this.getCompositionEntryFromBundle(bundle);
          if (compositionEntry) {
            const composition = compositionEntry.resource;
            const compositionDate = resourceDateFormatter.composition(
              composition
            );
            if (compositionDate) {
              this.sortBundleEntryForProcessing(bundle);
              bundle.entry.forEach(e => {
                const resourceProcessor = this.getResourceProcessor(e);
                if (resourceProcessor) {
                  resourceProcessor.process(
                    e.resource,
                    new BundleContext(bundle)
                  );
                }
                // add all the bundle entries against the composition date.
                this.addResourceEntryForDate(
                  compositionDate,
                  entryByHip,
                  e.resource,
                  hipEntriesByDate
                );
              });
            } else {
              console.log(
                'Error: Composition does not have date. Entire Bundle is added to unresolved entries'
              );
              unresolvedEntries.push(bundle);
            }
          } else {
            console.log(
              'Error: Bundle is a document but does not have composition resource. Invalid data structure.'
            );
          }
        } else {
          this.sortBundleEntryForProcessing(bundle);
          console.log(`procecssing bundle: ${  bundle.id}`);
          bundle.entry.forEach(e => {
            const resourceProcessor = this.getResourceProcessor(e);
            if (resourceProcessor) {
              resourceProcessor.process(e.resource, new BundleContext(bundle));
            }
            let dateFormatter;
            let parent;
            if (e.resource.parentResources) {
              parent = identifyFirstParent(e.resource);
              dateFormatter =
                resourceDateFormatter[parent.resourceType.toLowerCase()];
            } else {
              dateFormatter =
                resourceDateFormatter[e.resource.resourceType.toLowerCase()];
            }
            if (!dateFormatter) {
              parent = identifyParentOfType(e.resource, 'Composition');
              dateFormatter =
                parent &&
                resourceDateFormatter[parent.resourceType.toLowerCase()];
            }

            if (dateFormatter) {
              const resourceDate = e.resource.parentResources
                ? dateFormatter(parent)
                : dateFormatter(e.resource);
              if (resourceDate) {
                this.addResourceEntryForDate(
                  resourceDate,
                  entryByHip,
                  e.resource,
                  hipEntriesByDate
                );
              } else {
                unresolvedEntries.push(e.resource);
              }
            } else {
              unresolvedEntries.push(e.resource);
            }
          });
        }
      });
    });
    if (unresolvedEntries.length > 0) {
      console.log('Error: There are unresolved entries', unresolvedEntries);
    }
    return hipEntriesByDate;
  }
}

const fhirProcessors = [
  new CompositionProcessor(),
  new DiagnosticReportProcessor(),
  new ImagingStudyProcessor(),
  new MedicationRequestProcessor(),
  new DocumentReferenceProcessor(),
  new ConditionProcessor(),
  new EncounterProcessor(),
  new AllergyProcessor(),
  new ImmunizationProcessor()
];

function getDateFromString(dateString) {
  // NOTE: format is DD/MM/YYYY
  const dateParts = dateString.split('/');
  return new Date(
    parseInt(dateParts[2]),
    parseInt(dateParts[1]) - 1,
    parseInt(dateParts[0])
  );
}

function dayGrouper(data) {
  const processor = new HealthInfoProcessor();
  if (!data.data.entries) {
    data.entryByDays = {};
    return data;
  }
  const entriesByHips = processor.groupByHip(data.data.entries);
  console.log('Grouping entries by Hips: ', entriesByHips);
  const entriesByDays = processor.groupByDay(entriesByHips);
  console.log('Grouped entries by Date=>Hips: ', entriesByDays);
  const daywiseGroup = {};
  entriesByDays.sort((a, b) => {
    const dateA = getDateFromString(a.date);
    const dateB = getDateFromString(b.date);
    return dateA.getTime() == dateB.getTime()
      ? 0
      : dateA.getTime() > dateB.getTime()
      ? -1
      : 1;
  });
  entriesByDays.forEach(ebd => {
    daywiseGroup[ebd.date] = ebd.hipData;
  });
  data.entryByDays = daywiseGroup;
  const entriesCountByStatus = _.countBy(data.data.entries, 'status');
  data.entriesCountByStatus = entriesCountByStatus;
  return data;
}

export default dayGrouper;
