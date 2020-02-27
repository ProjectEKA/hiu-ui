const obsProperties = [
  {
    key: "valueQuantity",
    getValue: function(o) {
      return o.value.toString();
    }
  },
  {
    key: "valueCodableConcept",
    getValue: function(o) {
      return "Yet to handle";
    }
  },
  {
    key: "valueString",
    getValue: function(o) {
      return o.valueString;
    }
  },
  {
    key: "valueBoolean",
    getValue: function(o) {
      return o.valueBoolean.toString();
    }
  },
  {
    key: "valueDateTime",
    getValue: function(o) {
      return o.valueDateTime.toString();
    }
  },
  {
    key: "valueInteger",
    getValue: function(o) {
      return o.valueInteger;
    }
  },
  {
    key: "valuePeriod",
    getValue: function(o) {
      return (
        o.valuePeriod.start.toString() + "-" + o.valuePeriod.end.toString()
      );
    }
  },
  {
    key: "valueRatio",
    getValue: function(o) {
      return (
        o.valueRatio.numerator.toString() +
        ":" +
        o.valueRatio.denominator.toString()
      );
    }
  },
  {
    key: "valueRange",
    getValue: function(o) {
      return o.valueRange.low.toString() + "-" + o.valueRange.high.toString();
    }
  },
  {
    key: "valueTime",
    getValue: function(o) {
      return o.valueTime.toString();
    }
  },
  {
    key: "valueSampleData",
    getValue: function(o) {
      return o.valueSampleData.data;
    }
  }
];

function valueForObs(obs) {
  for (var i = 0; i < obsProperties.length; i++) {
    var prop = obsProperties[i];
    if (obs.hasOwnProperty(prop.key)) {
      return prop.getValue(obs);
    }
  }
  return undefined;
}

export default valueForObs;
