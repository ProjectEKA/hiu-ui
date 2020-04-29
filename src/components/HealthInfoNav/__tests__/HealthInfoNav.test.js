import React from 'react';
import { shallow } from 'enzyme';
import IconButton from '@material-ui/core/IconButton';
import HealthInfoNav from '../HealthInfoNav.view';

describe('HealthInfo', () => {
  const mockDates = [
    '22/1/2020',
    '3/1/2020',
    '5/11/2019',
    '2/11/2019',
    '1/2/2013',
    '1/12/2012',
  ];
  const setSelectedState = jest.fn();
  const wrapper = shallow(
    <HealthInfoNav
      dates={mockDates}
      setSelectedDate={setSelectedState}
      selectedDate="22/1/2020"
    />,
  );

  it('should render properly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should show navigation icons and on click call function setSelectedState', () => {
    wrapper.find(IconButton).at(0).simulate('click');
    expect(setSelectedState).toHaveBeenCalledTimes(1);
    wrapper.find(IconButton).at(1).simulate('click');
    expect(setSelectedState).toHaveBeenCalledTimes(2);
  });

  it('should enable/disable icon for left navigation', () => {
    expect(wrapper.find(IconButton).at(0).props().disabled).toEqual(true);
    wrapper.setProps({ selectedDate: '2/11/2019' });
    expect(wrapper.find(IconButton).at(0).props().disabled).toEqual(false);
  });

  it('should enable/disable icon for right navigation', () => {
    expect(wrapper.find(IconButton).at(1).props().disabled).toEqual(false);
    wrapper.setProps({ selectedDate: '1/12/2012' });
    expect(wrapper.find(IconButton).at(1).props().disabled).toEqual(true);
  });
});
