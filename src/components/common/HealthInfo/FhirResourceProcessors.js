export class FhirResourceProcessor {
    supports(resource) {
      return false;
    }
    process(resource, bundleContext) {
      console.log("Noop. This should not have been called");
      throw new Error("Shouldn't be calling on FhirResourceProcessor.");
    }
    addParentResource(target, parent) {
      if (target.parentResources) {
        target.parentResources.push(parent);
      } else {
        target.parentResources = [parent];
      }
    }
    findContainedResource(parent, reference, resourceType) {
      if (parent.contained) {
        return parent.contained.find(cr => {
          if (!resourceType)  {
            return reference.includes(cr.id);
          }
          if (cr.resourceType.toLowerCase() === resourceType.toLowerCase()) {
            //TODO very simplistic includes. we would need regex
            return reference.includes(cr.id);
          }
          return false;
        });
      }
      return undefined;
    }
};

export class ImagingStudyProcessor extends FhirResourceProcessor {
    supports(resource) {
      return resource.resourceType.toLowerCase() === "imagingstudy";
    }
    process(imagingStudy, bundleContext) {
      if (imagingStudy.endpoint) {
        imagingStudy.endpoint.forEach(ep => {
          var refResource = bundleContext.findReference("Endpoint", ep.reference);
          if (refResource) {
            ep.targetResource = refResource;
            this.addParentResource(refResource, imagingStudy);
          }
        });
      }
    }
};
  
export class DiagnosticReportProcessor extends FhirResourceProcessor {
    supports(resource) {
      return resource.resourceType.toLowerCase() === "diagnosticreport";
    }
  
    process(diagnosticReport, bundleContext) {
      if (diagnosticReport.media) {
        diagnosticReport.media.forEach(m => {
          var refResource = bundleContext.findReference(
            "Media",
            m.link.reference
          );
          if (refResource) {
            m.link.targetResource = refResource;
            this.addParentResource(refResource, diagnosticReport);
          }
        });
      }
  
      if (diagnosticReport.result) {
        diagnosticReport.result.forEach(obs => {
          var refResource = bundleContext.findReference(
            "Observation",
            obs.reference
          );
          if (refResource) {
            obs.targetResource = refResource;
            this.addParentResource(refResource, diagnosticReport);
          }
        });
      }
  
      if (diagnosticReport.imagingStudy) {
        diagnosticReport.imagingStudy.forEach(imageStudy => {
          var refResource = bundleContext.findReference(
            "ImagingStudy",
            imageStudy.reference
          );
          if (refResource) {
            imageStudy.targetResource = refResource;
            this.addParentResource(refResource, diagnosticReport);
          }
        });
      }
    }
};
  
export class CompositionProcessor extends FhirResourceProcessor {
    supports(resource) {
      return resource.resourceType.toLowerCase() === "composition";
    }
  
    process(composition, bundleContext) {
      if (composition.encounter) {
        var refResource = bundleContext.findReference("Encounter", composition.encounter.reference);
        if (refResource) {
          composition.encounter.targetResource = refResource;
          this.addParentResource(refResource, composition);
        }
      }
      if (composition.section) {
        var unresolvedCompositionSectionEntryRefs = [];
        composition.section.forEach(sec => {
          if (sec.entry) {
            sec.entry.forEach(secEntry => {
              var refResource = bundleContext.findReference(undefined, secEntry.reference);
              if (refResource) {
                secEntry.targetResource = refResource;
                this.addParentResource(refResource, composition);
              } else {
                unresolvedCompositionSectionEntryRefs.push[secEntry.reference];
              }
            });
          };
        });
        if (unresolvedCompositionSectionEntryRefs.length > 0) {
          console.log("there are some unresolved composition sections", unresolvedCompositionSectionEntryRefs);
        }
      }
    }
};

export class MedicationRequestProcessor extends FhirResourceProcessor {
  supports(resource) {
    return resource.resourceType.toLowerCase() === "medicationrequest";
  }
  process(medicationRequest, bundleContext) {
    if (medicationRequest.medicationReference) {
      var medication = this.findContainedResource(medicationRequest, 
        medicationRequest.medicationReference.reference, "Medication");
      if (!medication) {
        //try to find within bundle
        medication = bundleContext.findReference("Medication", medicationRequest.medicationReference.reference);
      }
      if (medication) {
        medicationRequest.medicationReference.targetResource = medication;
        this.addParentResource(medication, medicationRequest);
      }
    }
  }
};