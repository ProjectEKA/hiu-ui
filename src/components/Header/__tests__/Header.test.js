import React from 'react';
import { shallow } from 'enzyme';
import Button from '@material-ui/core/Button';
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
  });

  describe('Events', () => {
    describe('logout()', () => {
      it('should call removeItem() with auth-token', () => {
        wrapper.find(Button).simulate('click');
        expect(localStorage.removeItem).toHaveBeenCalledWith('auth-token');
      });

      it('should reload the window', () => {
        wrapper.find(Button).simulate('click');
        expect(window.location.reload).toHaveBeenCalled();
      });
    });
  });
});
