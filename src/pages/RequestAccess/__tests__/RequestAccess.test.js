import React from 'react';
import { shallow } from 'enzyme';
import { Button } from '@material-ui/core';
import RequestAccess from '../RequestAccess';
import DatePicker from '../../../components/DateTimePicker/DatePicker';
import DateTimePicker from '../../../components/DateTimePicker/DateTimePicker';
import SimpleMenu from '../../../components/SimpleMenu/SimpleMenu';
import RequestType from '../../../components/RequestType/RequestType';
import getNextDay from '../../../utils/getNextDay';

jest.mock('./../../../utils/getNextDay');

describe('Request Access', () => {
  const mockPurposeOfUse = [
    {
      code: 'ReferralService',
      display: 'Referral Service',
    },
    {
      code: 'BTG',
      display: 'Break the Glass',
    },
  ];
  const mockHiTypes = [
    {
      code: 'Condition',
      display: 'Condition',
    },
  ];

  const currentDate = new Date('2019-05-14T11:01:58.135Z');
  getNextDay.mockImplementation(() => new Date('2019-05-15T11:01:58.135Z'));
  global.Date = class extends Date {
    constructor(date) {
      if (date) {
        return super(date);
      }
      return currentDate;
    }
  };
  const onCreateConsent = jest.fn();

  const wrapper = shallow(
    <RequestAccess
      onCreateConsent={onCreateConsent}
      purposesOfUse={mockPurposeOfUse}
      hiTypes={mockHiTypes}
      patientId="sample@ncg"
      loading={false}
      error={false}
    />,
  );

  it('Should render properly', () => {
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find(DatePicker).length).toEqual(2);
    expect(wrapper.find(DateTimePicker).length).toEqual(1);
  });

  it('Purpose of request, should have referral services selected by default', () => {
    expect(wrapper.find(SimpleMenu).props().selectedValue).toEqual(
      'ReferralService'
    );
  });

  it('From: date component, should have current date when no date is selected ', () => {
    expect(
      wrapper.find(DatePicker).at(0).props().selectedDate.toISOString()
    ).toEqual('2019-05-14T11:01:58.135Z');
  });

  it('To: date component, should have current date when no date is selected ', () => {
    expect(
      wrapper.find(DatePicker).at(1).props().selectedDate.toISOString()
    ).toEqual('2019-05-14T11:01:58.135Z');
  });


  it('Expiry: date component, should have next day as current date when no date is selected ', () => {
    const ActualExpiryDate = wrapper
      .find(DateTimePicker)
      .props()
      .selectedDate.toISOString();
    const expectedExpiryDate = '2019-05-15T11:01:58.135Z';
    expect(ActualExpiryDate).toEqual(expectedExpiryDate);
  });

  it('Error message, should not be shown when no error occurs while creating consent', () => {
    const errorMessage = 'Error occured while creating consent.';
    expect(wrapper.contains(errorMessage)).toBe(false);
  });

  it('Error message, should be shown when error occurs while creating consent', () => {
    wrapper.setProps({ error: true });
    const errorMessage = 'Error occured while creating consent.';
    expect(wrapper.contains(errorMessage)).toBe(true);
  });

  it('Request Consent: Button, should be disabled if none of the HI types are selected', () => {
    expect(wrapper.find(Button).props().disabled).toBe(true);
  });

  it('Request Consent: Button, should be enabled when at least one HI type is selected', () => {
    const handleHITypeChange = wrapper.find(RequestType).props().handleChange;
    const event = { target: { checked: true } };
    handleHITypeChange('PatientHistory')(event);

    expect(wrapper.find(Button).props().disabled).toBe(false);
  });

  it('Request Consent: Button, call onCreateConsent on clicking if there are no errors', () => {
    wrapper.find(Button).props().onClick();
    expect(onCreateConsent).toHaveBeenCalled();
  });

  it('Request Consent: Button, should show error if patientID is empty on click', () => {
    wrapper.setProps({ patientId: '' });
    wrapper.find(Button).props().onClick();

    const errorMessage = 'Please enter a patient identifier';
    expect(wrapper.contains(errorMessage)).toBe(true);
  });

  it('Loading: Circular Progress, should appear when request is in loading state', () => {
    wrapper.setProps({ loading: true });
    expect(wrapper.find('#loader').exists()).toBe(true);
  });
});
