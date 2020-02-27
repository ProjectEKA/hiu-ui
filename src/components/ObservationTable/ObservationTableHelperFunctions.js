import React from "react";
import valueForObs from "./ObsValueHandlers";

function getConceptText(codeableConcept) {
  if (codeableConcept.text) {
    return codeableConcept.text;
  } else {
    if (codeableConcept.coding) {
      return codeableConcept.coding[0].display;
    }
  }
  return undefined;
}

function getConceptTextForComponents(components) {
  const componentControls = [];
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
