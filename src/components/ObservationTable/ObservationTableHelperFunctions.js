import React from 'react';
import valueForObs from './ObsValueHandlers';

export function getConceptText(codeableConcept) {
  if (codeableConcept && codeableConcept.text) {
    return codeableConcept.text;
  }
  if (codeableConcept && codeableConcept.coding) {
    return codeableConcept.coding[0].display;
  }

  return undefined;
}

export function getConceptTextForComponents(components) {
  const componentControls = [];
  if (components) {
    for (let i = 0; i < components.length; i++) {
      componentControls.push({
        text: getConceptText(components[i].code),
        value: valueForObs(components[i]),
      });
    }
    return (
      <ul>
        {componentControls.map((c) => (
          <li key={c.text}>
            {c.text}
            {' '}
            :
            {c.value}
          </li>
        ))}
      </ul>
    );
  }
  return undefined;
}

export const generateObservableEntity = (observation) => getConceptText(observation.code);

export const generateObservableEntityValue = (observation) => (
  <div>
    <div>{valueForObs(observation)}</div>
    {getConceptTextForComponents(observation.component)}
  </div>
);

export const generateObservableEntityStatusInterpretation = (observation) => (
  <div>
    {observation.status ? (
      <div>
        status:
        {observation.status}
      </div>
    ) : ''}
    {observation.interpretation ? (
      <div>
        interpretation:
        {' '}
        {getConceptText(observation.interpretation[0])}
      </div>
    ) : (
      ''
    )}
  </div>
);

export const generateRowsForMembers = (observations) => {
  const members = [];
  if (observations && observations[0].hasMember) {
    for (let i = 0; i < observations[0].resource.hasMember.length; i++) {
      const reference = observations[0].resource.hasMember[i].reference.split(
        '/',
      )[1];
      const referenceData = observations.find(
        (item) => item.resource.id === reference,
      ).resource;
      members.push(referenceData);
    }
    return members;
  }
  return undefined;
};
