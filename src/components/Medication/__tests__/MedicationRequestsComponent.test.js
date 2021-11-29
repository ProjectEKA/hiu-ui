import React from 'react';
import { shallow } from 'enzyme';
import MedicationRequestsComponent from '../MedicationRequestsComponent';
import TableStyles from '../../common/Styles/Table.style';

describe('MedicationRequestsComponent', () => {
  global.TIMEZONE_OFFSET = '-05:00';
  const mockData = [
    {
      resourceType: 'MedicationRequest',
      status: 'active',
      intent: 'order',
      medicationReference: {
        reference: 'Medication/c2b8f3fd-6da0-44ed-bc91-8bb05ff614d2',
        display: 'IV antibiotics',
        targetResource: {
          code: {
            coding: [
              {
                code: 'code',
                display: 'display',
              },
            ],
          },
        },
      },
      subject: {
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
    <MedicationRequestsComponent
      medicationRequests={mockData}
    />,
  );

  it('should render properly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should show correct data of medication requests', () => {
    expect(wrapper.find('.table-cell').at(0).text()).toEqual('21/01/2020');
    expect(wrapper.find('.table-cell').at(1).text()).toEqual('display (active)<MedicationReason />');

    mockData[0].medicationReference.targetResource = {
      code: {
        coding: [
          {
            code: 'code',
          },
        ],
      },
    };
    wrapper.setProps({ medicationRequests: mockData });
    expect(wrapper.find('.table-cell').at(1).text()).toEqual('code (active)<MedicationReason />');
  });

  it('should show default data if medication requests is not valid', () => {
    mockData[0].authoredOn = null;
    wrapper.setProps({ medicationRequests: mockData });
    expect(wrapper.find('.table-cell').at(0).text()).toEqual('');

    mockData[0].medicationReference.targetResource.code.coding = null;
    wrapper.setProps({ medicationRequests: mockData });
    expect(wrapper.find('.table-cell').at(1).text()).toEqual('Unspecified (active)<MedicationReason />');

    mockData[0].medicationReference.targetResource = null;
    wrapper.setProps({ medicationRequests: mockData });
    expect(wrapper.find('.table-cell').at(1).text()).toEqual('Unspecified (active)<MedicationReason />');

    wrapper.setProps({ medicationRequests: undefined });
    expect(wrapper.find(TableStyles).exists()).toEqual(false);
  });
});
