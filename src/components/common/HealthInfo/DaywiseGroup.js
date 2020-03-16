const rootResources = ["composition", "encounter", "diagnosticreport"];
const processingOrder = ["bundle", "composition", "encounter", "diagnosticreport", "imagingstudy", "media", "condition", "servicerequest", "procedure", "observation", "medicationrequest", "patient", "person", "organization", "practitioner", "endpoint", "location"];
const baseEntities = ["patient", "person", "organization", "practitioner", "endpoint", "location"];


const getFormattedDateString = function(dateString) {
  if (!dateString) {
    return undefined;
  }
  var dt = new Date(dateString);
  return dt.getDate() + "/" + (dt.getMonth()+1) + "/" + dt.getFullYear();
}

const resourceDateRetriever = {
  "composition" : function(res) {
    return getFormattedDateString(res.date);
  },
  "encounter" : function(res) {
    return getFormattedDateString(res.period.start);
  },
  "diagnosticreport" : function(res) {
    if (res.hasOwnProperty("issued")) {
      return getFormattedDateString(res.issued);
    } else if (res.hasOwnProperty("effectiveDateTime"))  {
      return getFormattedDateString(res.effectiveDateTime);
    } else {
      return getFormattedDateString(res.effectivePeriod.start);
    }
  },
  "media" : function(res) {
    if (res.hasOwnProperty("createdDateTime"))  {
      return getFormattedDateString(res.createdDateTime);
    } else {
      return res.createdPeriod ? getFormattedDateString(res.createdPeriod.start) : undefined;
    }
  },
  "condition" : function(res) {
    return getFormattedDateString(res.recordedDate);
  },
  "servicerequest" : function(res) {
    return getFormattedDateString(res.authoredOn);
  },
  "procedure" : function(res) {
    //TODO can be period, string etc. 
    return getFormattedDateString(res.performedDateTime);
  },
  "observation" : function(res) {
    if (res.hasOwnProperty("effectiveDateTime"))  {
      return getFormattedDateString(res.effectiveDateTime);
    } else if (res.hasOwnProperty("effectivePeriod"))  {
      return getFormattedDateString(res.effectivePeriod.start);
    } 
    return null;
  },
  "medicationrequest" : function(res) {
    return getFormattedDateString(res.authoredOn);
  },
  "imagingstudy" : function(res) {
    if (res.parentResource) {
      if (res.parentResource.hasOwnProperty("issued")) {
        return getFormattedDateString(res.parentResource.issued);
      } else if (res.parentResource.hasOwnProperty("effectiveDateTime"))  {
        return getFormattedDateString(res.parentResource.effectiveDateTime);
      } else {
        return getFormattedDateString(res.parentResource.effectivePeriod.start);
      }
    } else {
      return getFormattedDateString(res.started);
    }
  }
};

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
        entryByHip = { hipId: entry.hipId, hipName: entry.hipName, bundles: [] };
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
  
  
  getBundleCompositionDate(bundle) {
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
        var hipRecord = { "hipId": hipRef.hipId, "hipName": hipRef.hipName, "data": [resource] }; 
        entryByDate.hipData.push(hipRecord);
      } else {
        hipEntry.data.push(resource);
      }
    } else {
       var hipRecord = { "hipId": hipRef.hipId, "hipName": hipRef.hipName, "data": [resource] };
       var newEntryByDate = { "date": dateStr, "hipData": [hipRecord] };
       hipEntriesByDate.push(newEntryByDate);
    }
  }
  
  sortBundleEntryForProcessing(bundle) {
      bundle.entry.sort((a,b) => { 
        var a = processingOrder.indexOf(a.resource.resourceType.toLowerCase()), 
           b = processingOrder.indexOf(b.resource.resourceType.toLowerCase()); 
           return a < b ? -1 : (a === b ? 0 : 1) 
      });
  }
  
  groupByDay(entriesByHips) {
    var hipEntriesByDate = [];
    var unresolvedEntries = [];
    entriesByHips.forEach(entryByHip => {
      entryByHip.bundles.forEach(bundle => {
        if (bundle.type.toLowerCase() === "document") {
            var composition = this.getBundleCompositionDate(bundle);
            if (composition) {
              var resourceDate = resourceDateRetriever["composition"](composition);
              this.addResourceEntryForDate(resourceDate, entryByHip, bundle, hipEntriesByDate);
            } else {
              console.log("Error: Bundle is a document but does not have composition resource. Invalid data structure.");
            }
        } else {
          this.sortBundleEntryForProcessing(bundle);
          bundle.entry.forEach(e => {
            var resourceProcessor = fhirProcessors.find(function(p) { 
              return p.supports(e.resource); 
            });
            if (resourceProcessor) {
              resourceProcessor.process(e.resource, new BundleContext(bundle));
            }

            var dateRetriever;
            if (e.resource.parentResource) {
              dateRetriever = resourceDateRetriever[e.resource.parentResource.resourceType.toLowerCase()];
            } else {
              dateRetriever = resourceDateRetriever[e.resource.resourceType.toLowerCase()];
            }
            
            if (dateRetriever) {
              var resourceDate = e.resource.parentResource ? dateRetriever(e.resource.parentResource) : dateRetriever(e.resource);
              if (resourceDate) {
                this.addResourceEntryForDate(resourceDate, entryByHip, e.resource, hipEntriesByDate);
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
    console.log("there are a few unresolved entries", unresolvedEntries);
    return hipEntriesByDate;
  }
}


class BundleContext {
  constructor(bundle) {
    this.bundle = bundle;
  }

  findReference(resourceType, reference) {
    var entry = this.bundle.entry.find(e => {
      if (e.resource.resourceType.toLowerCase() === resourceType.toLowerCase()) {
        //TODO very simplistic includes. we would need regex
        return reference.includes(e.resource.id);
      } 
      return false;
    });
    return entry ? entry.resource : undefined;
  }
}

class FhirResourceProcessor {
  supports(resource) {
    return false;
  }
  process(resource, bundleContext) {
    console.log("Noop. This should not have been called");
    throw new Error("Shouldn't be calling on FhirResourceProcessor.");
  }
}

class ImagingStudyProcessor extends FhirResourceProcessor {
  supports(resource) {
    return resource.resourceType.toLowerCase() === "imagingstudy";
  }
  process(imagingStudy, bundleContext) {
    if (imagingStudy.endpoint) {
      imagingStudy.endpoint.forEach(ep => {
        var refResource = bundleContext.findReference("Endpoint", ep.reference);
        if (refResource) {
          ep.targetResource = refResource;
          refResource.parentResource = imagingStudy;
        }
      });
    }
  }
}

class DiagnosticReportProcessor extends FhirResourceProcessor {
  supports(resource) {
    return resource.resourceType.toLowerCase() === "diagnosticreport";
  }

  process(diagnosticReport, bundleContext) {
    if (diagnosticReport.media) {
      diagnosticReport.media.forEach(m => {
        var refResource = bundleContext.findReference("Media", m.link.reference);
        if (refResource) {
          m.link.targetResource = refResource;
          refResource.parentResource = diagnosticReport;
        }
      });
    }

    if (diagnosticReport.result) {
      diagnosticReport.result.forEach(obs => {
        var refResource = bundleContext.findReference("Observation", obs.reference);
        if (refResource) {
          obs.targetResource = refResource;
          refResource.parentResource = diagnosticReport;
        }
      });
    }

    if (diagnosticReport.imagingStudy) {
      diagnosticReport.imagingStudy.forEach(imageStudy => {
        var refResource = bundleContext.findReference("ImagingStudy", imageStudy.reference);
        if (refResource) {
          imageStudy.targetResource = refResource;
          refResource.parentResource = diagnosticReport;
        }
      });
    }
  }
}

const fhirProcessors = [new DiagnosticReportProcessor(), new ImagingStudyProcessor()];


function dayGrouper(data) {
  var processor = new HealthInfoProcessor();
  var entriesByHips = processor.groupByHip(data.data.entries);
  console.log("Grouping all entries by date: ", entriesByHips);
  var entriesByDays = processor.groupByDay(entriesByHips);
  console.log("Grouped entries by date/hips: ", entriesByDays);
  var daywiseGroup = {};
  entriesByDays.forEach(ebd => {
    daywiseGroup[ebd.date] = ebd.hipData;
  });
  data.entryByDays = daywiseGroup;
  return data;
}


export default dayGrouper;
