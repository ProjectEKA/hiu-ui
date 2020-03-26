import React, { useEffect, useState } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import PropTypes from "prop-types";
import {
  getConceptDisplay,
  formatDateString
} from "../common/HealthInfo/FhirResourcesUtils";
import TableStyles from "./../../components/common/Styles/Table.style";

const unitsOfTime = {
  s: "second",
  min: "minute",
  h: "hour",
  d: "day",
  wk: "week",
  mo: "month",
  a: "year"
};

const eventTiming = {
  HS: "before the hour of sleep",
  WAKE: "after waking",
  C: "at a meal",
  CM: "at breakfast",
  CD: "at lunch",
  CV: "at dinner",
  AC: "before a meal",
  ACM: "before breakfast",
  ACD: "before lunch",
  ACV: "before dinner",
  PC: "after a meal",
  PCM: "after breakfast",
  PCD: "after lunch",
  PCV: "after dinner"
};

const MedicationPriority = props => {
  let { mr } = props;
  if (mr.priority) {
    return (
      <li>
        <span>Priority: {mr.priority}</span>
      </li>
    );
  }
  return null;
};

const MedicationNote = props => {
  let { mr } = props;
  if (mr.note && mr.note.length > 0) {
    return (
      <li>
        Note:&nbsp;
        <span>
          {mr.note.map(n => n.text).reduce((acc, value) => acc + ", " + value)}
        </span>
      </li>
    );
  }
  return null;
};

const DosingInstructionAsNeeded = props => {
  let { dosage } = props;
  if (dosage.asNeededBoolean) {
    return (
      <li>
        <span>Take as needed</span>
      </li>
    );
  }
  return null;
};

const DosingInstructionForPatient = props => {
  let { dosage } = props;
  if (dosage.patientInstruction) {
    return (
      <li>
        <span>Instruction to Patient: {dosage.patientInstruction}</span>
      </li>
    );
  }
  return null;
};

const DosageTiming = props => {
  let { dosage } = props;
  if (dosage.timing && dosage.timing.event) {
    const eventDates = dosage.timing.event.reduce(
      (accumulator, currentValue, currentIndex, []) =>
        accumulator + ", " + formatDateString(currentValue.toString())
    );
    return <div>On: {eventDates}</div>;
  }
  var timingInfo = [];
  if (dosage.timing && dosage.timing.code) {
    timingInfo.push("Timing: " + dosage.timing.code.text);
  }
  if (dosage.timing && dosage.timing.repeat) {
    var repeat = dosage.timing.repeat;
    if (repeat.code) {
      if (repeat.code.text) {
        timingInfo.push(repeat.code);
      }
    }
    if (repeat.count) {
      timingInfo.push("Repeat count: " + repeat.count);
    }
    if (repeat.boundsDuration) {
      timingInfo.push(
        "Duration: " +
          repeat.boundsDuration.value +
          " " +
          repeat.boundsDuration.unit
      );
    }
    if (repeat.boundsRange) {
      timingInfo.push(
        "Range low: " +
          repeat.boundsRange.low +
          ", Range high: " +
          repeat.boundsRange.high
      );
    }
    if (repeat.boundsPeriod) {
      if (repeat.boundsPeriod.start) {
        timingInfo.push(
          "Period Start: " + formatDateString(repeat.boundsPeriod.start)
        );
      }
      if (repeat.boundsPeriod.start) {
        timingInfo.push(
          "Period End: " + formatDateString(repeat.boundsPeriod.end)
        );
      }
    }
    if (repeat.period) {
      var periodFreqStr = "";
      if (repeat.frequency) {
        periodFreqStr = repeat.frequency + " times ";
      }
      periodFreqStr =
        periodFreqStr +
        "in " +
        repeat.period +
        " " +
        unitsOfTime[repeat.periodUnit];
      if (repeat.periodMax) {
        periodFreqStr = periodFreqStr + ", max period - " + repeat.periodMax;
      }
      timingInfo.push(periodFreqStr);
    }

    if (repeat.duration) {
      var durationInfo = "Duration: ";
      durationInfo =
        durationInfo + repeat.duration + " " + unitsOfTime[repeat.durationUnit];
      if (repeat.durationMax) {
        durationInfo = durationInfo + ", max duration - " + repeat.durationMax;
      }
      timingInfo.push(durationInfo);
    }
    if (repeat.when) {
      var whenStr = "when: ";
      if (repeat.offset) {
        whenStr = whenStr + repeat.offset + " minutes ";
      }
      whenStr = whenStr + eventTiming[repeat.when];
      timingInfo.push(whenStr);
    }
  }
  if (timingInfo.length > 0) {
    const lineInfo = timingInfo.map((info, index) => (
      <li key={index}>{info}</li>
    ));
    return <ul> {lineInfo} </ul>;
  }
  return null;
};

const DosingInstruction = props => {
  let { dosage } = props;
  return dosage ? (
    <div>
      <span>{dosage.text}</span>
      <br />
      <DosageTiming dosage={dosage} />
      <ul className="instruction-list-item">
        <DosingInstructionForPatient dosage={dosage} />
        <DosingInstructionAsNeeded dosage={dosage} />
      </ul>
    </div>
  ) : null;
};

DosingInstruction.propTypes = {
  dosage: PropTypes.any.isRequired
};

const MedicationDose = props => {
  let { dosageInstructions } = props;
  if (dosageInstructions && dosageInstructions.length > 0) {
    const instrs = dosageInstructions.map((instruction, index) => (
      <DosingInstruction key={index} dosage={instruction}></DosingInstruction>
    ));
    return <div>{instrs}</div>;
  } else {
    return null;
  }
};

MedicationDose.propTypes = {
  dosageInstructions: PropTypes.any.isRequired
};

const MedicationRequestsComponent = ({ medicationRequests }) => {
  function findMedicationName(medication) {
    if (medication) {
      var codeableConcept = medication.code;
      if (codeableConcept.coding) {
        return codeableConcept.coding[0].display
          ? codeableConcept.coding[0].display
          : codeableConcept.coding[0].code;
      } else {
        return "Unspecified";
      }
    } else {
      return "Unspecified";
    }
  }

  return medicationRequests && medicationRequests.length > 0 ? (
    <TableStyles>
      <TableContainer className="table-container" component={Paper}>
        <Table className="table" aria-label="simple table">
          <TableHead>
            <TableRow className="table-head">
              <TableCell className="header" colSpan={4}>
                Medication:
              </TableCell>
            </TableRow>
            <TableRow className="table-head">
              <TableCell align="left">Date</TableCell>
              <TableCell align="left">Medication</TableCell>
              <TableCell align="left">Dosing Instruction</TableCell>
              <TableCell align="left">Additional Info</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {medicationRequests.map((mr, i) => (
              <TableRow key={i}>
                <TableCell>
                  {mr.authoredOn ? formatDateString(mr.authoredOn) : ""}
                </TableCell>
                <TableCell>
                  {findMedicationName(mr.medicationReference.targetResource)}
                  {" (" + mr.status + ")"}
                </TableCell>
                <TableCell>
                  {<MedicationDose dosageInstructions={mr.dosageInstruction} />}
                </TableCell>
                <TableCell>
                  <ul className="mediation-list-item">
                    {<MedicationPriority mr={mr} />}
                    {<MedicationNote mr={mr} />}
                  </ul>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </TableStyles>
  ) : (
    <div></div>
  );
};

export default MedicationRequestsComponent;
