import React from 'react';
import { shallow } from 'enzyme';
import DosageTiming from '../DosageTiming.view';

describe('DosageTiming', () => {
  const mockData = {
    sequence: 1,
    text: '22/01/2020 to 07/02/2020',
    timing: {
      event: ['1','2019-01-21T12:00:00+01:00','2019-01-22T12:00:00+01:00'],
    },
  };
  global.TIMEZONE_OFFSET = '-05:00';
  const wrapper = shallow(
    <DosageTiming dosage={mockData} />,
  );

  it('should render properly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should render event date text if event data is found', () => {
    mockData.timing = {
      event: ['22/1/2019'],
    };
    wrapper.setProps({ dosage: mockData });
    expect(wrapper.find('div').at(0).text()).toEqual('On:22/1/2019');
  });

  it('should render timing text if code text is found', () => {
    mockData.timing = {
      code: {
        text: '15 days',
      },
    };
    wrapper.setProps({ dosage: mockData });
    expect(wrapper.find('ul li').at(0).text()).toEqual('Timing: 15 days');
  });

  it('should render repeat code text if repeat code text is found', () => {
    mockData.timing = {
      repeat: {
        code: {
          text: '15 days',
        },
      },
    };
    wrapper.setProps({ dosage: mockData });
    expect(wrapper.find('ul li').at(0).text()).toEqual('15 days');
  });

  it('should render repeat count text if count is found', () => {
    mockData.timing = {
      repeat: {
        count: 10,
      },
    };
    wrapper.setProps({ dosage: mockData });
    expect(wrapper.find('ul li').at(0).text()).toEqual('Repeat count: 10');
  });

  it('should render duration text if bound duration is found', () => {
    mockData.timing = {
      repeat: {
        boundsDuration: {
          value: '30',
          unit: 'minutes',
        },
      },
    };
    wrapper.setProps({ dosage: mockData });
    expect(wrapper.find('ul li').at(0).text()).toEqual('Duration: 30 minutes');
  });

  it('should render range text if bound range is found', () => {
    mockData.timing = {
      repeat: {
        boundsRange: {
          low: '10',
          high: '20',
        },
      },
    };
    wrapper.setProps({ dosage: mockData });
    expect(wrapper.find('ul li').at(0).text()).toEqual('Range low: 10, Range high: 20');
  });

  it('should render start and end of period text if bounds Period is found', () => {
    mockData.timing = {
      repeat: {
        boundsPeriod: {
          start: '2012-12-01T12:00:00+01:00',
        },
      },
    };
    wrapper.setProps({ dosage: mockData });
    expect(wrapper.find('ul li').at(0).text()).toEqual('Period Start: 01/12/2012');

    mockData.timing = {
      repeat: {
        boundsPeriod: {
          end: '2012-12-10T12:00:00+01:00',
        },
      },
    };
    wrapper.setProps({ dosage: mockData });
    expect(wrapper.find('ul li').at(0).text()).toEqual('Period End: 10/12/2012');
  });

  it('should render period frequency text if period data is found', () => {
    mockData.timing = {
      repeat: {
        frequency: '5',
        period: '10',
        periodUnit: 'min',
        periodMax: '1 day',
      },
    };
    wrapper.setProps({ dosage: mockData });
    expect(wrapper.find('ul li').at(0).text()).toEqual('5 times in 10 minute, max period - 1 day');
  });

  it('should render duration text if duration data is found', () => {
    mockData.timing = {
      repeat: {
        duration: '5',
        durationUnit: 'd',
        durationMax: '7 days',
      },
    };
    wrapper.setProps({ dosage: mockData });
    expect(wrapper.find('ul li').at(0).text()).toEqual('Duration: 5 day, max duration - 7 days');
  });

  it('should render when text if when and offset data is found', () => {
    mockData.timing = {
      repeat: {
        when: [
          'WAKE',
          'C',
        ],
        offset: '10',
      },
    };
    wrapper.setProps({ dosage: mockData });
    expect(wrapper.find('ul li').at(0).text()).toEqual('when: 10 minutes after waking, at a meal');
  });

  it('should not render anything if data is not found', () => {
    wrapper.setProps({ dosage: {} });
    expect(wrapper.find('ul').exists()).toEqual(false);
    expect(wrapper.find('div').exists()).toEqual(false);
  });
});
