import React from 'react';
import { shallow } from 'enzyme';
import DosingInstructionAsNeeded from '../DosingInstructionAsNeeded.view';

describe('DosingInstructionAsNeeded', () => {
  const mockData = {
    sequence: 1,
    text: '22/01/2020 to 07/02/2020',
    timing: {
      event: ['22/1/2019'],
    },
    asNeededBoolean: true,
  };
  const wrapper = shallow(
    <DosingInstructionAsNeeded dosage={mockData} />,
  );

  it('should render properly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should render data as needed', () => {
    expect(wrapper.find('span').text()).toEqual('Take as needed');
  });

  it('should not render anything if asNeededBoolean is provided as false', () => {
    mockData.asNeededBoolean = false;
    wrapper.setProps({ dosage: mockData });
    expect(wrapper.find('li').at(0).exists()).toEqual(false);
  });
});
