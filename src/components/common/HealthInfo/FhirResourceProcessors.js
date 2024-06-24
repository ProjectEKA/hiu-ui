export class FhirResourceProcessor {
  supports(resource) {
    return false;
  }

  process(resource, bundleContext) {
    console.log('Noop. This should not have been called');
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
      return parent.contained.find((cr) => {
        if (!resourceType) {
          return reference.includes(cr.id);
        }
        if (cr.resourceType.toLowerCase() === resourceType.toLowerCase()) {
          // TODO very simplistic includes. we would need regex
          return reference.includes(cr.id);
        }
        return false;
      });
    }
    return undefined;
  }
}

export class ImagingStudyProcessor extends FhirResourceProcessor {
  supports(resource) {
    return resource.resourceType.toLowerCase() === 'imagingstudy';
  }

  process(imagingStudy, bundleContext) {
    if (imagingStudy.endpoint) {
      imagingStudy.endpoint.forEach((epRef) => {
        const refResource = bundleContext.findReference('Endpoint', epRef);
        if (refResource) {
          epRef.targetResource = refResource;
          this.addParentResource(refResource, imagingStudy);
        }
      });
    }
  }
}

export class DiagnosticReportProcessor extends FhirResourceProcessor {
  supports(resource) {
    return resource.resourceType.toLowerCase() === 'diagnosticreport';
  }

  process(diagnosticReport, bundleContext) {
    if (diagnosticReport.media) {
      diagnosticReport.media.forEach((m) => {
        const refResource = bundleContext.findReference('Media', m.link);
        if (refResource) {
          m.link.targetResource = refResource;
          this.addParentResource(refResource, diagnosticReport);
        }
      });
    }

    if (diagnosticReport.result) {
      diagnosticReport.result.forEach((obsRef) => {
        const refResource = bundleContext.findReference('Observation', obsRef);
        if (refResource) {
          obsRef.targetResource = refResource;
          this.addParentResource(refResource, diagnosticReport);
        }
      });
    }

    if (diagnosticReport.imagingStudy) {
      diagnosticReport.imagingStudy.forEach((imageStudyRRef) => {
        const refResource = bundleContext.findReference('ImagingStudy',imageStudyRRef);
        if (refResource) {
          imageStudyRRef.targetResource = refResource;
          this.addParentResource(refResource, diagnosticReport);
        }
      });
    }
  }
}

export class CompositionProcessor extends FhirResourceProcessor {
  supports(resource) {
    return resource.resourceType.toLowerCase() === 'composition';
  }

  process(composition, bundleContext) {
    if (composition.encounter) {
      const refResource = bundleContext.findReference('Encounter', composition.encounter);
      if (refResource) {
        composition.encounter.targetResource = refResource;
        this.addParentResource(refResource, composition);
      }
    }
    if (composition.author) {
      composition.author.forEach((ref) => {
        let author = this.findContainedResource(composition, ref.reference, 'Practitioner');
        if (!author) {
          author = bundleContext.findReference('Practitioner', ref);
        }
        if (author) {
          ref.targetResource = author;
          this.addParentResource(author, composition);
        }
      });
    }
    if (composition.section) {
      const unresolvedCompositionSectionEntryRefs = [];
      composition.section.forEach((sec) => {
        if (sec.entry) {
          sec.entry.forEach((secEntryRef) => {
            const refResource = bundleContext.findReference(undefined, secEntryRef);
            if (refResource) {
              secEntryRef.targetResource = refResource;
              this.addParentResource(refResource, composition);
              this.addParentResource(refResource, sec);
            } else {
              unresolvedCompositionSectionEntryRefs.push[secEntryRef.reference];
            }
          });
        }
      });
      if (unresolvedCompositionSectionEntryRefs.length > 0) {
        console.log('there are some unresolved composition sections', unresolvedCompositionSectionEntryRefs);
      }
    }
  }
}

export class MedicationRequestProcessor extends FhirResourceProcessor {
  supports(resource) {
    return resource.resourceType.toLowerCase() === 'medicationrequest';
  }

  process(medicationRequest, bundleContext) {
    if (medicationRequest.medicationReference) {
      let medication = this.findContainedResource(medicationRequest,
        medicationRequest.medicationReference.reference, 'Medication');
      if (!medication) {
        // try to find within bundle
        medication = bundleContext.findReference('Medication', medicationRequest.medicationReference);
      }
      if (medication) {
        medicationRequest.medicationReference.targetResource = medication;
        this.addParentResource(medication, medicationRequest);
      }
    }
    
    if (medicationRequest.reasonReference) {
      medicationRequest.reasonReference.forEach((reasonRef) => {
        let conditionReason = this.findContainedResource(medicationRequest, reasonRef.reference, 'Condition');
        if (!conditionReason) {
          // try to find within bundle
          conditionReason = bundleContext.findReference('Condition', reasonRef);
        }
        if (conditionReason) {
          reasonRef.targetResource = conditionReason;
          this.addParentResource(conditionReason, medicationRequest);
        }
      });
    }
  }
}

export class ImmunizationProcessor extends FhirResourceProcessor {
  supports(resource) {
    return resource.resourceType.toLowerCase() === 'immunization';
  }

  process(immunization, bundleContext) {  
    if (immunization.reasonReference) {
      immunization.reasonReference.forEach((reasonRef) => {
        let reasonResource = this.findContainedResource(immunization, reasonRef.reference, 'Condition');
        reasonResource = reasonResource || this.findContainedResource(immunization, reasonRef.reference, 'Observation');
        reasonResource = reasonResource || this.findContainedResource(immunization, reasonRef.reference, 'DiagnosticReport');
        
        if (!reasonResource) {
          // try to find within bundle
          reasonResource = bundleContext.findReference('Condition', reasonRef);
          reasonResource = reasonResource || bundleContext.findReference('Observation', reasonRef);
          reasonResource = reasonResource || bundleContext.findReference('DiagnosticReport', reasonRef);
        }
        if (reasonResource) {
          reasonRef.targetResource = reasonResource;
          this.addParentResource(reasonResource, immunization);
        }
      });
    }

    if(immunization.reaction){
      immunization.reaction.forEach(reaction => {
        let reactionResource = this.findContainedResource(immunization, reaction.detail.reference, 'Observation');
        if (!reactionResource) {
          // try to find within bundle
          reactionResource = bundleContext.findReference('Observation', reaction.detail);
        }
        if (reactionResource) {
          reaction.detail.targetResource = reactionResource;
          this.addParentResource(reactionResource, immunization);
        }
      });
    }

    if (immunization.manufacturer) {
      const {reference} = immunization.manufacturer;
      let manufacturerOrg = this.findContainedResource(immunization, reference, 'Organization');
      if (!manufacturerOrg) {
        // try to find within bundle
        manufacturerOrg = bundleContext.findReference('Organization', immunization.manufacturer);
      }
      if (manufacturerOrg) {
        immunization.manufacturer.targetResource = manufacturerOrg;
        this.addParentResource(manufacturerOrg, immunization);
      }
    }
  }
}


export class DocumentReferenceProcessor extends FhirResourceProcessor {
  supports(resource) {
    return resource.resourceType.toLowerCase() === 'documentreference';
  }

  process(documentReference, bundleContext) {
    if (documentReference.author) {
      let author = this.findContainedResource(documentReference,
        documentReference.author[0].reference, 'Practitioner');
      if (!author) {
        // try to find within bundle
        author = bundleContext.findReference('Practitioner', documentReference.author[0]);
      }
      if (author) {
        documentReference.author[0].targetResource = author;
        this.addParentResource(author, documentReference);
      }
    }

    if (documentReference.context && documentReference.context.encounter) {
      const refResource = bundleContext.findReference('Encounter', documentReference.context.encounter[0]);
      if (refResource) {
        documentReference.context.encounter[0].targetResource = refResource;
        this.addParentResource(refResource, documentReference);
      }
    }
  }
}

export class ConditionProcessor extends FhirResourceProcessor {
  supports(resource) {
    return resource.resourceType.toLowerCase() === 'condition';
  }

  process(condition, bundleContext) {
    if (condition.recorder) {
      condition.recorder.forEach((ref) => {
        let author = this.findContainedResource(condition, ref.reference, 'Practitioner');
        if (!author) {
          author = bundleContext.findReference('Practitioner', ref);
        }
        if (author) {
          ref.targetResource = author;
          this.addParentResource(author, condition);
        }
      });
    }
  }
}

export class AllergyProcessor extends FhirResourceProcessor {
  supports(resource) {
    return resource.resourceType.toLowerCase() === 'allergyintolerance';
  }

  process(allergy, bundleContext) {
    if (allergy.recorder) {
        const { reference } = allergy.recorder;
        let author = this.findContainedResource(allergy, reference, 'Practitioner');
        if (!author) {
          author = bundleContext.findReference('Practitioner', allergy.recorder);
        }
        if (author) {
          allergy.recorder.targetResource = author;
          this.addParentResource(author, allergy);
        }
    }
  }
}

export class EncounterProcessor extends FhirResourceProcessor {
  supports(resource) {
    return resource.resourceType.toLowerCase() === 'encounter';
  }

  process(encounter, bundleContext) {
    if (encounter.diagnosis) {
      encounter.diagnosis.forEach((diag) => {
        let condition = bundleContext.findReference('Condition', diag.condition);
        if (condition) {
          diag.condition.targetResource = condition;
          this.addParentResource(condition, encounter);
        }
      });
    }
  }
}