import React from 'react';
import { mount } from 'enzyme';
import RequestType from '../RequestType';

describe('RequestType', () => {
  const requestTypes = [
    {
      label: 'PatientHistory',
      value: 'Patient History',
    },
    {
      label: 'Medications',
      value: 'Medications',
    },
    {
      label: 'DiagnosisLab',
      value: 'Diagnosis Lab',
    },
    {
      label: 'RadiologyLab',
      value: 'Radiology Lab',
    },
    {
      label: 'Observations',
      value: 'Observations',
    },
  ];
  it('should render properly', () => {
    const noop = jest.fn();
    const wrapper = mount(
      <RequestType requestTypes={requestTypes} handleChange={noop} />,
    );

    expect(wrapper).toMatchSnapshot();
    wrapper
      .find('.check-box')
      .at(0)
      .simulate('click');
    expect(noop).toHaveBeenCalled();
  });
});
