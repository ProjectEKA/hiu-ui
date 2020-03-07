import React from "react";
import valueForObs from "./ObsValueHandlers";

function getConceptText(codeableConcept) {
  if (codeableConcept && codeableConcept.text) {
    return codeableConcept.text;
  } else {
    if (codeableConcept && codeableConcept.coding) {
      return codeableConcept.coding[0].display;
    }
  }
  return undefined;
}

function getConceptTextForComponents(components) {
  const componentControls = [];
  if (components) {
    for (var i = 0; i < components.length; i++) {
      componentControls.push({
        text: getConceptText(components[i].code),
        value: valueForObs(components[i])
      });
    }
    return (
      <ul>
        {componentControls.map(c => (
          <li key={c.text}>
            {c.text} : {c.value}
          </li>
        ))}
      </ul>
    );
  }
  return undefined;
}

export const generateObservableEntity = observation => {
  return getConceptText(observation.code);
};

export const generateObservableEntityValue = observation => {
  return (
    <div>
      <div>{valueForObs(observation)}</div>
      {getConceptTextForComponents(observation.component)}
    </div>
  );
};

export const generateObservableEntityStatusInterpretation = observation => {
  return (
    <div>
      {observation.status ? <div>status: {observation.status}</div> : ""}
      {observation.interpretation ? (
        <div>
          interpretation: {getConceptText(observation.interpretation[0])}
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export const generateRowsForResults = diagnosticReports => {
  console.log("diagnosticReports", diagnosticReports);
  const results = [];
  if (diagnosticReports && diagnosticReports[0].resource.result) {
    for (var i = 0; i < diagnosticReports[0].resource.result.length; i++) {
      const reference = diagnosticReports[0].resource.result[i].reference.split(
        "/"
      )[1];
      const referenceData = diagnosticReports.find(
        item => item.resource.id === reference
      ).resource;
      results.push(referenceData);
    }
    return results;
  }
  return undefined;
};
