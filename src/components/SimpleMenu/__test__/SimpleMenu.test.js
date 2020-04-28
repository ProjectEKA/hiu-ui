import { shallow } from 'enzyme';
import React from 'react';
import SimpleMenu from '../SimpleMenu';

describe('Simple Menu', () => {
  const MenuItems = [
    {
      label: 'General Consulting',
      value: 'GeneralConsulting',
    },
    {
      label: 'Referral services',
      value: 'ReferralServices',
    },
    {
      label: 'Episode of Care',
      value: 'EpisodeOfCare',
    },
    {
      label: 'Encounter',
      value: 'Encounter',
    },
  ];
  const noop = jest.fn();
  const wrapper = shallow(
    <SimpleMenu
      menuItems={MenuItems}
      selectedValue="GeneralConsulting"
      handleChange={noop}
    />,
  );

  it('should render properly ', () => {
    expect(wrapper.debug()).toMatchSnapshot();
  });

  it('should call function on click of menuItem', () => {
    wrapper.find('#menu-item').at(0).simulate('click');
    expect(noop).toHaveBeenCalled();
  });
});
