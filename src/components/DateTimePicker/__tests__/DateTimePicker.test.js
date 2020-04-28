import React from 'react';
import { shallow } from 'enzyme';
import DateTimePicker from '../DateTimePicker';

describe('DateTimePicker', () => {
  const minDate = new Date('2019-01-01T11:01:58.135Z');
  const maxDate = new Date('2019-12-31T11:01:58.135Z');
  const selectedDate = new Date('2020-04-22T03:17:48.603+0000');
  const handleDateChange = jest.fn();
  const wrapper = shallow(
    <DateTimePicker
      minDate={minDate}
      maxDate={maxDate}
      disableFuture={false}
      selectedDate={selectedDate}
      disablePast={false}
      handleDateChange={handleDateChange}
    />,
  );

  it('should render properly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
