import React from 'react';
import { shallow } from 'enzyme';
import CCRDocument from '../CCRDocument';
import ObservationTable from '../../ObservationTable/ObservationTable';
import MedicationRequestsComponent from '../../Medication/MedicationRequestsComponent';

describe('CCRDocument', () => {
  const mockData = [
    {
      resourceType: 'Composition',
      title: 'Discharge Summary',
      date: '2019-12-03',
      type: {
        coding: [
          {
            system: 'http://loinc.org',
            code: '28655-9'
          }
        ],
      },
      author: [
        {
          display: 'Dr.Divya'
        }
      ],
      event: [
        {
          period: {
            start: '2019-12-03',
            end: '2019-12-30'
          }
        }
      ],
      status: 'final',
    },
    {
      resourceType: 'MedicationRequest',
      parentType: 'Composition',
      status: 'active',
      intent: 'order',
      medicationReference: { reference: 'Medication/c2b8f3fd-6da0-44ed-bc91-8bb05ff614d2', display: 'IV antibiotics' },
      subject: { display: 'Shriya' },
      authoredOn: '2020-01-22',
      dosageInstruction: [],
    },
    {
      resourceType: 'Observation',
      parentType: 'Composition',
      status: 'active',
      intent: 'order',
      medicationReference: { reference: 'Medication/c2b8f3fd-6da0-44ed-bc91-8bb05ff614d2', display: 'IV antibiotics' },
      subject: { display: 'Shriya' },
      authoredOn: '2020-01-22',
      dosageInstruction: [],
    },
  ];
  const wrapper = shallow(
    <CCRDocument
      consentReqId="123"
      compositionData={mockData}
    />,
  );

  it('should render properly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
