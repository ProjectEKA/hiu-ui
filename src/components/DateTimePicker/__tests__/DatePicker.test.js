import React from 'react';
import { shallow } from 'enzyme';
import DatePicker from '../DatePicker';

describe('DatePicker', () => {
  const minDate = new Date('2019-01-01T11:01:58.135Z');
  const selectedDate = new Date('2020-04-22T03:17:48.603+0000');
  const handleDateChange = jest.fn();
  const wrapper = shallow(
    <DatePicker
      selectedDate={selectedDate}
      minDate={minDate}
      disableFuture={false}
      handleDateChange={handleDateChange}
    />,
  );

  it('should render properly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
