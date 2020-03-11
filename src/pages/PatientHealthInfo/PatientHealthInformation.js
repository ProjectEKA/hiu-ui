import React, { useEffect } from "react";
import PatientDetails from "../../components/PatientDetails/PatientDetails";
import HealthInfoNav from "../../components/HealthInfoNav/HealthInfoNav";
import HealthInfoContainer from "../../components/HealthInfoContainer/HealthInfoContainer";
import { useParams } from "react-router-dom";

function filterByHipId(entriesByHips, hipId) {
  return entriesByHips.filter(e => {
    return e.hipId === hipId;
  });
}

function groupByHip(entries) {
  var entriesByHips = [];
  entries.forEach(entry => {
    var entryByHip;
    var hipEntries = filterByHipId(entriesByHips, entry.hipId);
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

function groupByDay(entries) {
  var entriesByDate = [];
}

function groupByDate(data) {
  var entriesByHips = groupByHip(data.data.entries);
  groupByDay(entriesByHips);

  return data;
}

const patient = {
  name: "john",
  age: 20
};

const DateArray = [
  "01/01/2000",
  "02/01/2000",
  "05/01/2000",
  "12/01/2000",
  "26/01/2000",
  "29/01/2000"
];
const selectedDate = "12/01/2000";

const PatientHealthInformation = ({ loadHealthData, match }) => {
  useEffect(() => {
    loadHealthData({ id: match.params.requestId, groupFunction: groupByDate });
  }, []);
  return (
    <div>
      <PatientDetails patient={patient} />
      <HealthInfoNav dates={DateArray} selectedDate={selectedDate} />
      <HealthInfoContainer />
    </div>
  );
};

export default PatientHealthInformation;
