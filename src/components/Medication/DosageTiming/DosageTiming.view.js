/* eslint-disable no-unused-vars, no-empty-pattern */

import React from 'react';
import * as PropTypes from 'prop-types';
import { formatDateString } from '../../common/HealthInfo/FhirResourcesUtils';
import { EVENT_TIMING, UNITS_OF_TIME } from '../constants';

const DosageTiming = (props) => {
  const { dosage } = props;
  if (dosage.timing && dosage.timing.event) {
    const eventDates = dosage.timing.event.reduce(
      (accumulator, currentValue, currentIndex, []) => `${accumulator}, ${formatDateString(currentValue.toString())}`,
    );
    return (
      <div>
        On:
        {eventDates}
      </div>
    );
  }
  const timingInfo = [];
  if (dosage.timing && dosage.timing.code) {
    timingInfo.push(`Timing: ${dosage.timing.code.text}`);
  }
  if (dosage.timing && dosage.timing.repeat) {
    const { repeat } = dosage.timing;
    if (repeat.code) {
      if (repeat.code.text) {
        timingInfo.push(repeat.code.text);
      }
    }
    if (repeat.count) {
      timingInfo.push(`Repeat count: ${repeat.count}`);
    }
    if (repeat.boundsDuration) {
      timingInfo.push(
        `Duration: ${
          repeat.boundsDuration.value
        } ${
          repeat.boundsDuration.unit}`,
      );
    }
    if (repeat.boundsRange) {
      timingInfo.push(
        `Range low: ${
          repeat.boundsRange.low
        }, Range high: ${
          repeat.boundsRange.high}`,
      );
    }
    if (repeat.boundsPeriod) {
      if (repeat.boundsPeriod.start) {
        timingInfo.push(
          `Period Start: ${formatDateString(repeat.boundsPeriod.start)}`,
        );
      }
      if (repeat.boundsPeriod.end) {
        timingInfo.push(
          `Period End: ${formatDateString(repeat.boundsPeriod.end)}`,
        );
      }
    }
    if (repeat.period) {
      let periodFreqStr = '';
      if (repeat.frequency) {
        periodFreqStr = `${repeat.frequency} times `;
      }
      periodFreqStr = `${periodFreqStr
      }in ${
        repeat.period
      } ${
        UNITS_OF_TIME[repeat.periodUnit]}`;
      if (repeat.periodMax) {
        periodFreqStr = `${periodFreqStr}, max period - ${repeat.periodMax}`;
      }
      timingInfo.push(periodFreqStr);
    }

    if (repeat.duration) {
      let durationInfo = 'Duration: ';
      durationInfo = `${durationInfo + repeat.duration} ${UNITS_OF_TIME[repeat.durationUnit]}`;
      if (repeat.durationMax) {
        durationInfo = `${durationInfo}, max duration - ${repeat.durationMax}`;
      }
      timingInfo.push(durationInfo);
    }
    if (repeat.when) {
      let whenStr = 'when: ';
      if (repeat.offset) {
        whenStr = `${whenStr + repeat.offset} minutes `;
      }
      whenStr += repeat.when.map((value) => EVENT_TIMING[value]).join(', ');
      timingInfo.push(whenStr);
    }
  }
  if (timingInfo.length > 0) {
    const lineInfo = timingInfo.map((info) => (
      <li key={info}>{info}</li>
    ));
    return (
      <ul>
        {' '}
        {lineInfo}
        {' '}
      </ul>
    );
  }
  return null;
};

const codeShape = {
  text: PropTypes.string,
};

DosageTiming.propTypes = {
  dosage: PropTypes.shape({
    timing: PropTypes.shape({
      event: PropTypes.arrayOf(PropTypes.string),
      code: PropTypes.shape(codeShape),
      repeat: PropTypes.shape({
        code: PropTypes.shape(codeShape),
        count: PropTypes.number,
        boundsDuration: PropTypes.shape({
          value: PropTypes.string,
          unit: PropTypes.string,
        }),
        boundsRange: PropTypes.shape({
          low: PropTypes.string,
          high: PropTypes.string,
        }),
        boundsPeriod: PropTypes.shape({
          start: PropTypes.string,
          end: PropTypes.string,
        }),
        duration: PropTypes.string,
        durationUnit: PropTypes.string,
        frequency: PropTypes.any,
        periodUnit: PropTypes.string,
        periodMax: PropTypes.string,
        period: PropTypes.any,
        durationMax: PropTypes.string,
        offset: PropTypes.string,
        when: PropTypes.arrayOf(PropTypes.string),
      }),
    }),
  }).isRequired,
};

export default DosageTiming;
