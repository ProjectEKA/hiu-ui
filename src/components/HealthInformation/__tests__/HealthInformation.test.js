import React from 'react';
import { shallow } from 'enzyme';
import HealthInformation from '../HealthInformation.view';
import HealthInformationContent from '../HealthInformationContent.view';

describe('HealthInformation', () => {
  const mockHealthInfo = {
    '22/1/2020': [
      {
        hipId: '10000005',
        hipName: 'Max Health Care',
        data: [
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
        ],
      },
    ],
  };
  const wrapper = shallow(
    <HealthInformation
      consentReqId="123"
      healthInfo={mockHealthInfo}
      selectedDate="22/1/2020"
    />,
  );

  it('should render properly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should render HealthInformationContent component with correct props', () => {
    expect(wrapper.find(HealthInformationContent).props().consentReqId).toEqual('123');
    expect(wrapper.find(HealthInformationContent).props().hipName).toEqual('Max Health Care');
    expect(wrapper.find(HealthInformationContent).props().data).toEqual(mockHealthInfo['22/1/2020'][0].data);
  });

  it('should render blank if data is undefined', () => {
    wrapper.setProps({ healthInfo: {} });
    expect(wrapper.find('div').length).toEqual(1);
  });
});
