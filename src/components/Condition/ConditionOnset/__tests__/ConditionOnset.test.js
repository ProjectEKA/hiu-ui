import React from 'react';
import { shallow } from 'enzyme';
import ConditionOnset from '../ConditionOnset.view';

describe('ConditionOnset', () => {
  let wrapper;
  let mockData;
  global.TIMEZONE_OFFSET = '-05:00';

  it('should render properly', () => {
    mockData = {
      onsetDateTime: '2020-02-20T00:30:08.000+0000',
      onsetAge: {
        value: '150',
        unit: 'cm',
      },
      onsetPeriod: {
        start: '2020-02-01T00:30:08.000+0000',
        end: '2020-02-20T00:30:08.000+0000',
      },
      onsetRange: {
        low: '10',
        high: '50',
      },
      onsetString: 'test',
    };
    wrapper = shallow(<ConditionOnset condition={mockData} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should show onsetTime', () => {
    mockData = {
      onsetDateTime: '2020-02-20T00:30:08.000+0000',
    };
    wrapper = shallow(<ConditionOnset condition={mockData} />);
    expect(wrapper.find('span').at(0).text()).toEqual('Onset time: 19/02/2020');
  });

  it('should show onsetAge', () => {
    mockData = {
      onsetAge: {
        value: '150',
        unit: 'cm',
      },
    };
    wrapper = shallow(<ConditionOnset condition={mockData} />);
    expect(wrapper.find('span').at(0).text()).toEqual('Onset age: 150 cm');
  });

  it('should show onsetPeriod', () => {
    mockData = {
      onsetPeriod: {
        start: '2020-02-01T00:30:08.000+0000',
        end: '2020-02-20T00:30:08.000+0000',
      },
    };
    wrapper = shallow(<ConditionOnset condition={mockData} />);
    expect(wrapper.find('span').at(0).text()).toEqual('Period start: 31/01/2020, end: 19/02/2020');
  });

  it('should show onsetRange', () => {
    mockData = {
      onsetRange: {
        low: '10',
        high: '50',
      },
    };
    wrapper = shallow(<ConditionOnset condition={mockData} />);
    expect(wrapper.find('span').at(0).text()).toEqual('Range low: 10, high: 50');
  });

  it('should show onsetString', () => {
    mockData = {
      onsetString: 'test',
    };
    wrapper = shallow(<ConditionOnset condition={mockData} />);
    expect(wrapper.find('span').at(0).text()).toEqual('Onset test');
  });

  it('should return empty object if condition data is undefined', () => {
    wrapper = shallow(<ConditionOnset />);
    expect(wrapper.find('span').exists()).toEqual(false);
  });
});
