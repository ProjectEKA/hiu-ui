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
  it('should render properly ', () => {
    const wrapper = shallow(
      <SimpleMenu menuItems={MenuItems} selectedValue="GeneralConsulting" />,
    );
    expect(wrapper.debug()).toMatchSnapshot();
  });

  it('should render properly', () => {
    const noop = jest.fn();
    const wrapper = shallow(
      <SimpleMenu
        menuItems={MenuItems}
        selectedValue="GeneralConsulting"
        handleChange={noop}
      />,
    );

    wrapper.find('#select-menu').simulate('click');

    expect(noop).toHaveBeenCalled;
  });
});
