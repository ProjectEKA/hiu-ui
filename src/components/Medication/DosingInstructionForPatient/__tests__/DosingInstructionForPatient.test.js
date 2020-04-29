import React from 'react';
import { shallow } from 'enzyme';
import DosingInstructionForPatient from '../DosingInstructionForPatient.view';

describe('DosingInstructionsForPatient', () => {
  const mockData = {
    patientInstruction: 'Information text ...',
  };
  const wrapper = shallow(
    <DosingInstructionForPatient dosage={mockData} />,
  );

  it('should render properly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should render data of patient instruction', () => {
    expect(wrapper.find('span').at(0).text()).toEqual('Instruction to Patient:Information text ...');
  });

  it('should not render anything if patientInstruction is not provided', () => {
    mockData.patientInstruction = null;
    wrapper.setProps({ dosage: mockData });
    expect(wrapper.find('li').at(0).exists()).toEqual(false);
  });
});
