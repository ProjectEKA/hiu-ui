const processingOrder = [
    "bundle",
    "composition",
    "encounter",
    "diagnosticreport",
    "imagingstudy",
    "media",
    "condition",
    "servicerequest",
    "procedure",
    "observation",
    "medicationrequest",
    "patient",
    "person",
    "organization",
    "practitioner",
    "endpoint",
    "location"
];

const baseEntities = [
    "patient",
    "person",
    "organization",
    "practitioner",
    "endpoint",
    "location"
];

const rootResources = ["composition", "encounter", "diagnosticreport", "imagingstudy", "procedure", "observation"];

const getFormattedDateString = function(dateString) {
    if (!dateString) {
      return undefined;
    }
    var dt = new Date(dateString);
    return dt.getDate() + "/" + (dt.getMonth() + 1) + "/" + dt.getFullYear();
};

const identifyFirstParent = function(resource) {
  if (resource.parentResources) {
    resource.parentResources.sort((r1, r2) => {
      var i1 = rootResources.indexOf(r1.resourceType.toLowerCase());
      var i2 = rootResources.indexOf(r2.resourceType.toLowerCase());
      return i1 < i2 ? -1 : (i1 > i2 ? 1 : 0);
    });
    var firstParent = resource.parentResources[0];
    return firstParent;
  } else {
    return undefined;
  }
};

const identifyParentOfType = function(resource, parentType) {
  if (resource.parentResources) {
    return resource.parentResources.find(pr => {
      return pr.resourceType.toLowerCase() === parentType.toLowerCase();
    });
  } else {
    return undefined;
  }
};

const resourceDateFormatter = {
    composition: function(res) {
      return getFormattedDateString(res.date);
    },
    encounter: function(res) {
      if (res.hasOwnProperty("period")) {
        return getFormattedDateString(res.period.start);
      }
      return null;
    },
    diagnosticreport: function(res) {
      if (res.hasOwnProperty("issued")) {
        return getFormattedDateString(res.issued);
      } else if (res.hasOwnProperty("effectiveDateTime")) {
        return getFormattedDateString(res.effectiveDateTime);
      } else {
        return getFormattedDateString(res.effectivePeriod.start);
      }
    },
    media: function(res) {
      if (res.hasOwnProperty("createdDateTime")) {
        return getFormattedDateString(res.createdDateTime);
      } else {
        return res.createdPeriod
          ? getFormattedDateString(res.createdPeriod.start)
          : undefined;
      }
    },
    condition: function(res) {
      return getFormattedDateString(res.recordedDate);
    },
    servicerequest: function(res) {
      return getFormattedDateString(res.authoredOn);
    },
    procedure: function(res) {
      //TODO can be period, string etc.
      return getFormattedDateString(res.performedDateTime);
    },
    observation: function(res) {
      if (res.hasOwnProperty("effectiveDateTime")) {
        return getFormattedDateString(res.effectiveDateTime);
      } else if (res.hasOwnProperty("effectivePeriod")) {
        return getFormattedDateString(res.effectivePeriod.start);
      }
      return null;
    },
    medicationrequest: function(res) {
      return getFormattedDateString(res.authoredOn);
    },
    imagingstudy: function(res) {
      if (res.parentResources) {
        var firstParent = identifyFirstParent(res);
        if (firstParent.hasOwnProperty("issued")) {
          return getFormattedDateString(firstParent.issued);
        } else if (firstParent.hasOwnProperty("effectiveDateTime")) {
          return getFormattedDateString(firstParent.effectiveDateTime);
        } else {
          return getFormattedDateString(firstParent.effectivePeriod.start);
        }
      } else {
        return getFormattedDateString(res.started);
      }
    }
};

const getConceptDisplay = function(codeableConcept) {
  if (codeableConcept) {
    if (codeableConcept.text) {
      return codeableConcept.text;
    }
    if (codeableConcept.coding) {
      for (var index = 0; index < codeableConcept.coding.length; index++) { 
        var coding = codeableConcept.coding[index];
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

const leftPadZero = function(n){
  return n > 9 ? "" + n: "0" + n;
}

const formatDateString = function(aDate, includeTime) {
  if (aDate) { 
    var dateString = aDate.toString();
    if (dateString.length > 0) {
      var dt = new Date(dateString);
      var dtStr = leftPadZero(dt.getDate()) + "/" + leftPadZero(dt.getMonth() + 1) + "/" + dt.getFullYear();
      if (includeTime) {
        dtStr = dtStr + " " + leftPadZero(dt.getHours()) + ":" + leftPadZero(dt.getMinutes());
      }
      return dtStr;
    } else {
      return "";
    }
  }
  return "";
};

export { identifyParentOfType, identifyFirstParent, baseEntities, processingOrder, getFormattedDateString, resourceDateFormatter, getConceptDisplay, formatDateString };