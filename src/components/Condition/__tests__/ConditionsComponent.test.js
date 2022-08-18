import React from 'react';
import { shallow } from 'enzyme';
import ConditionsComponent from '../ConditionsComponent';
import TableStyles from '../../common/Styles/Table.style';

describe('ConditionsComponent', () => {
  global.TIMEZONE_OFFSET = '-05:00';
  const mockData = [
    {
      code: {
        text: 'day1',
      },
      severity: {
        text: 'severity',
      },
      clinicalStatus: {
        coding: [
          {
            system: 'http://terminology.hl7.org/CodeSystem/condition-clinical',
            code: 'active',
          },
        ],
        text: 'clinical status',
      },
      verificationStatus: {
        coding: [
          {
            system: 'http://terminology.hl7.org/CodeSystem/condition-ver-status',
            code: 'confirmed',
          },
        ],
        text: 'approved',
      },
      note: [
        {
          text: 'condition note',
        },
      ],
      category: [
        {
          text: 'category',
          coding: {
            code: 'abc',
            display: 'abc text',
          },
        },
      ],
      recordedDate: '2020-02-19T00:30:08.000+0000',
      onsetDateTime: '',
      onsetAge: {
        value: '',
        unit: '',
      },
      onsetPeriod: {
        start: '',
        end: '',
      },
      onsetRange: {
        low: '',
        high: '',
      },
      onsetString: '',
    },
  ];
  const wrapper = shallow(<ConditionsComponent conditionList={mockData} />);

  it('should render properly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should render correct data in table body', () => {
    expect(wrapper.find('.table-cell').at(0).text()).toEqual('18/02/2020');
    expect(wrapper.find('.table-cell').at(1).text()).toContain('day1');
    expect(wrapper.find('.table-cell').at(2).text()).toContain('Severity: severity');
    expect(wrapper.find('.table-cell').at(2).text()).toContain('Clinical Status: clinical status');
    expect(wrapper.find('.table-cell').at(2).text()).toContain('Verification Status: approved');
  });

  it('should render invalid data in table body', () => {
    mockData[0].recordedDate = undefined;
    mockData[0].severity = undefined;
    mockData[0].clinicalStatus = undefined;
    mockData[0].verificationStatus = undefined;
    wrapper.setProps({ conditionList: mockData });
    expect(wrapper.find('.table-cell').at(0).text()).toEqual('');
    expect(wrapper.find('.table-cell').at(2).text()).toContain('Severity: Unspecified');
    expect(wrapper.find('.table-cell').at(2).text()).toContain('Clinical Status: Unspecified');
    expect(wrapper.find('.table-cell').at(2).text()).toContain('Verification Status: Unspecified');
  });

  it('should return empty object if condition data is undefined', () => {
    wrapper.setProps({ conditionList: undefined });
    expect(wrapper.find(TableStyles).exists()).toEqual(false);
  });
});
