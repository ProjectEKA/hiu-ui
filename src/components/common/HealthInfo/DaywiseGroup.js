import { identifyFirstParent, baseEntities, processingOrder, getFormattedDateString, resourceDateFormatter } from "./FhirResourcesUtils";
import { BundleContext } from "./BundleContext";
import { FhirResourceProcessor, CompositionProcessor, ImagingStudyProcessor, DiagnosticReportProcessor } from "./FhirResourceProcessors";

class HealthInfoProcessor {
  filterByHipId(entriesByHips, hipId) {
    return entriesByHips.filter(e => {
      return e.hipId === hipId;
    });
  }

  groupByHip(entries) {
    var entriesByHips = [];
    entries.forEach(entry => {
      var entryByHip;
      var hipEntries = this.filterByHipId(entriesByHips, entry.hipId);
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
      } else {
        entryByHip.bundles.push(entry.data);
      }
    });
    return entriesByHips;
  }

  getCompositionEntryFromBundle(bundle) {
    return bundle.entry.find(function(e) {
      return e.resource.resourceType.toLowerCase() === "composition";
    });
  }

  addResourceEntryForDate(dateStr, hipRef, resource, hipEntriesByDate) {
    var entryByDate = hipEntriesByDate.find(function(e) {
      return e.date === dateStr;
    });

    if (entryByDate) {
      var hipEntry = entryByDate.hipData.find(function(e) {
        return e.hipId === hipRef.hipId;
      });
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
      var newEntryByDate = { date: dateStr, hipData: [hipRecord] };
      hipEntriesByDate.push(newEntryByDate);
    }
  }

  sortBundleEntryForProcessing(bundle) {
    bundle.entry.sort((a, b) => {
      var a = processingOrder.indexOf(a.resource.resourceType.toLowerCase()),
        b = processingOrder.indexOf(b.resource.resourceType.toLowerCase());
      return a < b ? -1 : a === b ? 0 : 1;
    });
  }

  getResourceProcessor(entry) {
    return fhirProcessors.find(function(p) {
      return p.supports(entry.resource);
    });
  }

  groupByDay(entriesByHips) {
    var hipEntriesByDate = [];
    var unresolvedEntries = [];
    entriesByHips.forEach(entryByHip => {
      entryByHip.bundles.forEach(bundle => {
        if (bundle.type.toLowerCase() === "document") {
          var compositionEntry = this.getCompositionEntryFromBundle(bundle);
          if (compositionEntry) {
            var composition = compositionEntry.resource;
            var compositionDate = resourceDateFormatter["composition"](composition);
            if (compositionDate) {
              this.sortBundleEntryForProcessing(bundle);
              bundle.entry.forEach(e => {
                var resourceProcessor = this.getResourceProcessor(e);
                if (resourceProcessor) {
                  resourceProcessor.process(e.resource, new BundleContext(bundle));
                }
                //add all the bundle entries against the composition date.
                this.addResourceEntryForDate(compositionDate, entryByHip, e.resource, hipEntriesByDate);
              });
            } else {
              console.log("Error: Composition does not have date. Entire Bundle is added to unresolved entries");
              unresolvedEntries.push(bundle);
            }
          } else {
            console.log("Error: Bundle is a document but does not have composition resource. Invalid data structure.");
          }
        } else {
          this.sortBundleEntryForProcessing(bundle);
          bundle.entry.forEach(e => {
            var resourceProcessor = this.getResourceProcessor(e);
            if (resourceProcessor) {
              resourceProcessor.process(e.resource, new BundleContext(bundle));
            }
            var dateFormatter;
            var firstParent;
            if (e.resource.parentResources) {
              firstParent = identifyFirstParent(e.resource.parentResources);
              dateFormatter = resourceDateFormatter[fistParent.resourceType.toLowerCase()];
            } else {
              dateFormatter = resourceDateFormatter[e.resource.resourceType.toLowerCase()];
            }
            if (dateFormatter) {
              var resourceDate = e.resource.parentResources
                ? dateFormatter(firstParent)
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
      console.log("Error: There are unresolved entries", unresolvedEntries);
    }
    return hipEntriesByDate;
  }
}

const fhirProcessors = [
  new CompositionProcessor(),
  new DiagnosticReportProcessor(),
  new ImagingStudyProcessor()
];

function dayGrouper(data) {
  var processor = new HealthInfoProcessor();
  if (!data.data.entries) {
    data.entryByDays = {};
    return data;
  }
  var entriesByHips = processor.groupByHip(data.data.entries);
  console.log("Grouping entries by Hips: ", entriesByHips);
  var entriesByDays = processor.groupByDay(entriesByHips);
  console.log("Grouped entries by Date=>Hips: ", entriesByDays);
  var daywiseGroup = {};
  entriesByDays.forEach(ebd => {
    daywiseGroup[ebd.date] = ebd.hipData;
  });
  data.entryByDays = daywiseGroup;
  return data;
}

export default dayGrouper;
