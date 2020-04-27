import React from 'react';
import { shallow } from 'enzyme';
import { Redirect } from 'react-router-dom';
import Button from "@material-ui/core/Button";
import Header from '..';

describe('Header', () => {
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
      wrapper.find(Button).simulate('click');
      expect(wrapper.find(Redirect)).toHaveLength(1);
    });
  });

  describe('Events', () => {
    describe('logout()', () => {
      it('should call removeItem() with auth-token', () => {
        wrapper.find(Button).simulate('click');
        expect(localStorage.removeItem).toHaveBeenCalledWith('auth-token');
      });

      it('should call setState with true', () => {
        const setState = jest.fn();
        jest.spyOn(React, 'useState').mockImplementation((init) => [init, setState]);
        wrapper = shallow(<Header />);

        wrapper.find(Button).simulate('click');

        expect(setState).toHaveBeenCalledWith(true);
      });
    });
  });
});
