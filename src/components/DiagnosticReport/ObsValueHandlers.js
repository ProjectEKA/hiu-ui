/* istanbul ignore file */
/* eslint-disable no-plusplus */

const obsProperties = [
  {
    key: 'valueQuantity',
    getValue(o) {
      return o.value.toString();
    },
  },
  {
    key: 'valueCodableConcept',
    getValue() {
      return 'Yet to handle';
    },
  },
  {
    key: 'valueString',
    getValue(o) {
      return o.valueString;
    },
  },
  {
    key: 'valueBoolean',
    getValue(o) {
      return o.valueBoolean.toString();
    },
  },
  {
    key: 'valueDateTime',
    getValue(o) {
      return o.valueDateTime.toString();
    },
  },
  {
    key: 'valueInteger',
    getValue(o) {
      return o.valueInteger;
    },
  },
  {
    key: 'valuePeriod',
    getValue(o) {
      return (
        `${o.valuePeriod.start.toString()}-${o.valuePeriod.end.toString()}`
      );
    },
  },
  {
    key: 'valueRatio',
    getValue(o) {
      return (
        `${o.valueRatio.numerator.toString()
        }:${
          o.valueRatio.denominator.toString()}`
      );
    },
  },
  {
    key: 'valueRange',
    getValue(o) {
      return `${o.valueRange.low.toString()}-${o.valueRange.high.toString()}`;
    },
  },
  {
    key: 'valueTime',
    getValue(o) {
      return o.valueTime.toString();
    },
  },
  {
    key: 'valueSampleData',
    getValue(o) {
      return o.valueSampleData.data;
    },
  },
];

function valueForObs(obs) {
  for (let i = 0; i < obsProperties.length; i++) {
    const prop = obsProperties[i];
    if (Object.prototype.hasOwnProperty.call(obs, prop.key)) {
      return prop.getValue(obs);
    }
  }
  return undefined;
}

export default valueForObs;
