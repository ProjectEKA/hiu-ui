import React from 'react';
import { shallow } from 'enzyme';
import { Redirect } from 'react-router-dom';
import Header from '..';
import { LogoutButton } from '../Header.style';

describe('<Header />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Header />);
    localStorage.removeItem.mockReset();
  });

  describe('HTML Structure', () => {
    it('should render properly', () => {
      expect(wrapper.debug()).toMatchSnapshot();
    });

    it('should not render Redirect component when isLoggedOut is false', () => {
      expect(wrapper.find(Redirect)).toHaveLength(0);
    });

    it('should render Redirect component when isLoggedOut is true', () => {
      wrapper.find(LogoutButton).simulate('click');
      expect(wrapper.find(Redirect)).toHaveLength(1);
    });
  });

  describe('Events', () => {
    describe('logout()', () => {
      it('should call removeItem() with auth-token', () => {
        wrapper.find(LogoutButton).simulate('click');
        expect(localStorage.removeItem).toHaveBeenCalledWith('auth-token');
      });

      it('should call setState with true', () => {
        const setState = jest.fn();
        jest.spyOn(React, 'useState').mockImplementation((init) => [init, setState]);
        wrapper = shallow(<Header />);

        wrapper.find(LogoutButton).simulate('click');

        expect(setState).toHaveBeenCalledWith(true);
      });
    });
  });
});
