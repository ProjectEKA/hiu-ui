import React from 'react';
import { shallow } from 'enzyme';
import Breadcrumb from '../Breadcrumb.view';

describe('Breadcrumb', () => {
  it('should render properly', () => {
    global.BASE_NAME = '/';
    const wrapper = shallow(<Breadcrumb />);
    expect(wrapper).toMatchSnapshot();
  });
});
