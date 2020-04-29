import React from 'react';
import { shallow } from 'enzyme';
import DosingInstruction from '../DosingInstruction.view';

describe('DosingInstruction', () => {
  const mockData = {
    sequence: 1,
    text: '22/01/2020 to 07/02/2020',
    timing: {
      event: ['22/1/2019'],
    },
  };
  const wrapper = shallow(
    <DosingInstruction dosage={mockData} />,
  );

  it('should render properly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should not render anything if data is undefined', () => {
    wrapper.setProps({ dosage: undefined });
    expect(wrapper.find('div').exists()).toEqual(false);
  });
});
