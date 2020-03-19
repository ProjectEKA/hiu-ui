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

const rootResources = ["composition", "encounter", "diagnosticreport"];

const getFormattedDateString = function(dateString) {
    if (!dateString) {
      return undefined;
    }
    var dt = new Date(dateString);
    return dt.getDate() + "/" + (dt.getMonth() + 1) + "/" + dt.getFullYear();
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
      if (res.parentResource) {
        if (res.parentResource.hasOwnProperty("issued")) {
          return getFormattedDateString(res.parentResource.issued);
        } else if (res.parentResource.hasOwnProperty("effectiveDateTime")) {
          return getFormattedDateString(res.parentResource.effectiveDateTime);
        } else {
          return getFormattedDateString(res.parentResource.effectivePeriod.start);
        }
      } else {
        return getFormattedDateString(res.started);
      }
    }
};

export { baseEntities, processingOrder, getFormattedDateString, resourceDateFormatter };