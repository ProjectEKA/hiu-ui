import React from 'react';
import { shallow } from 'enzyme';
import CCRDocument from '../../Composition/CCRDocument';
import ObservationTable from '../../ObservationTable/ObservationTable';
import DiagnosticReportComponent from '../../DiagnosticReport/DiagnosticReportComponent';
import MedicationRequestsComponent from '../../Medication/MedicationRequestsComponent';
import HealthInformationContent from '../HealthInformationContent.view';
import DischargeSummary from "../../DischargeSummary/DischargeSummary.view";

describe('HealthInformationContent', () => {
  const mockData = [
    {
      resourceType: 'MedicationRequest',
      status: 'active',
      intent: 'order',
      medicationReference:
                {
                  reference: 'Medication/c2b8f3fd-6da0-44ed-bc91-8bb05ff614d2',
                  display: 'IV antibiotics',
                },
      subject:
                {
                  display: 'Shriya',
                },
      authoredOn: '2020-01-22',
      dosageInstruction: [
        {
          sequence: 1,
          text: '22/01/2020 to 07/02/2020',
          timing: {
            code: {
              text: '15 days',
            },
          },
        },
      ],
    },
  ];
  const wrapper = shallow(
    <HealthInformationContent
      consentReqId="123"
      hipName="Max Health Care"
      data={mockData}
      title="Discharge Summary"
      startDate="2018-04-01T15:30:10+01:00"
      endDate="2018-04-10T15:30:10+01:00"
    />,
  );

  it('should render properly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should render CCRDocument with composition data', () => {
    mockData[0].resourceType = 'Composition';
    wrapper.setProps({ data: mockData });
    expect(wrapper.find(CCRDocument).props().compositionData).toEqual(mockData);
    expect(wrapper.find(CCRDocument).props().consentReqId).toEqual('123');
  });

  it('should render ObservationTable with data', () => {
    mockData[0].resourceType = 'Observation';
    wrapper.setProps({ data: mockData });
    expect(wrapper.find(ObservationTable).props().data).toEqual(mockData);
  });

  it('should render DiagnosticReportComponent with data', () => {
    mockData[0].resourceType = 'DiagnosticReport';
    wrapper.setProps({ data: mockData });
    expect(wrapper.find(DiagnosticReportComponent).props().data).toEqual(mockData);
  });

  it('should render with no data', () => {
    wrapper.setProps({ data: undefined });
    expect(wrapper.find(CCRDocument).props().compositionData).toEqual([]);
    expect(wrapper.find(ObservationTable).props().data).toEqual([]);
    expect(wrapper.find(DiagnosticReportComponent).props().data).toEqual([]);
    expect(wrapper.find(MedicationRequestsComponent).props().medicationRequests).toEqual([]);
  });
});
