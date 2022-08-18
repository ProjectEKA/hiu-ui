import moment from "moment";
import Config from "../../../Config";

const processingOrder = [
  'bundle',
  'composition',
  'procedure',
  'diagnosticreport',
  'documentreference',
  'imagingstudy',
  'media',
  'servicerequest',
  'observation',
  'medicationrequest',
  'medication',
  'encounter',
  'condition',
  'patient',
  'person',
  'organization',
  'practitioner',
  'endpoint',
  'location',
];

const baseEntities = [
  'patient',
  'person',
  'organization',
  'practitioner',
  'endpoint',
  'location',
];

const rootResources = ['composition', 'procedure', 'diagnosticreport', 'documentreference', 'medicationrequest', 'imagingstudy', 'observation', 'encounter'];

const getFormattedDateString = function (dateString) {
  if (!dateString) {
    return undefined;
  }
  const dt = new Date(dateString);
  return `${dt.getDate()}/${dt.getMonth() + 1}/${dt.getFullYear()}`;
};

const identifyFirstParent = function (resource) {
  if (resource.parentResources) {
    resource.parentResources.sort((r1, r2) => {
      const i1 = rootResources.indexOf(r1.resourceType.toLowerCase());
      const i2 = rootResources.indexOf(r2.resourceType.toLowerCase());
      return i1 < i2 ? -1 : (i1 > i2 ? 1 : 0);
    });
    const firstParent = resource.parentResources[0];
    return firstParent;
  }
  return undefined;
};

const identifyParentOfType = function (resource, parentType) {
  if (resource.parentResources) {
    return resource.parentResources.find((pr) => pr.resourceType.toLowerCase() === parentType.toLowerCase());
  }
  return undefined;
};

const resourceDateFormatter = {
  composition(res) {
    return getFormattedDateString(res.date);
  },
  encounter(res) {
    if (res.hasOwnProperty('period')) {
      return getFormattedDateString(res.period.start);
    }
    return null;
  },
  diagnosticreport(res) {
    if (res.hasOwnProperty('issued')) {
      return getFormattedDateString(res.issued);
    } if (res.hasOwnProperty('effectiveDateTime')) {
      return getFormattedDateString(res.effectiveDateTime);
    }
    return getFormattedDateString(res.effectivePeriod.start);
  },
  media(res) {
    if (res.hasOwnProperty('createdDateTime')) {
      return getFormattedDateString(res.createdDateTime);
    }
    return res.createdPeriod
      ? getFormattedDateString(res.createdPeriod.start)
      : undefined;
  },
  condition(res) {
    return getFormattedDateString(res.recordedDate);
  },
  servicerequest(res) {
    return getFormattedDateString(res.authoredOn);
  },
  procedure(res) {
    // TODO can be period, string etc.
    return getFormattedDateString(res.performedDateTime);
  },
  observation(res) {
    if (res.hasOwnProperty('effectiveDateTime')) {
      return getFormattedDateString(res.effectiveDateTime);
    } if (res.hasOwnProperty('effectivePeriod')) {
      return getFormattedDateString(res.effectivePeriod.start);
    }
    return null;
  },
  medicationrequest(res) {
    return getFormattedDateString(res.authoredOn);
  },
  imagingstudy(res) {
    if (res.parentResources) {
      const firstParent = identifyFirstParent(res);
      if (firstParent.hasOwnProperty('issued')) {
        return getFormattedDateString(firstParent.issued);
      } if (firstParent.hasOwnProperty('effectiveDateTime')) {
        return getFormattedDateString(firstParent.effectiveDateTime);
      }
      return getFormattedDateString(firstParent.effectivePeriod.start);
    }
    return getFormattedDateString(res.started);
  },
  documentreference(res) {
    return getFormattedDateString(res.date);
  },
};

const getConceptDisplay = function (codeableConcept) {
  if (codeableConcept) {
    if (codeableConcept.text) {
      return codeableConcept.text;
    }
    if (codeableConcept.coding) {
      for (let index = 0; index < codeableConcept.coding.length; index++) {
        const coding = codeableConcept.coding[index];
        if (coding.display) {
          return coding.display;
        }
        if (coding.code) {
          return coding.code;
        }
      }
    }
  }
  return null;
};

  const getCodingDisplay = function (coding) {
  if (!coding) return undefined;
  return coding.display || coding.code;
};


const formatDateString = function (aDate, includeTime) {
  if (aDate) {
    const dateString = aDate.toString();
    if (dateString.length > 0) {
      const momentDate = moment.utc(aDate);
      let dt = momentDate.utcOffset(Config.TIMEZONE_OFFSET).format('DD/MM/YYYY');
      if (includeTime) {
        dt = momentDate.utcOffset(Config.TIMEZONE_OFFSET).format('DD/MM/YYYY hh:mm A');
      }
      return dt;
    }
    return '';
  }
  return '';
};

export {
  identifyParentOfType, identifyFirstParent, baseEntities, processingOrder, getFormattedDateString, resourceDateFormatter, getConceptDisplay, formatDateString, getCodingDisplay, 
};
