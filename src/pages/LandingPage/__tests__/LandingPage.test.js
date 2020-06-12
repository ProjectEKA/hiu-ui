import React from 'react';
import { shallow } from 'enzyme';
import Button from '@material-ui/core/Button';
import { Modal, Snackbar } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import LandingPage from '../LandingPage';

describe('Landing Page', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<LandingPage />);
  });

  it('should render properly', () => {
    expect(wrapper.debug()).toMatchSnapshot();
  });

  it('Request Access: Modal, should be closed by default', () => {
    expect(wrapper.find(Modal).props().open).toBe(false);
  });

  it('Success Message: Snackbar, should be closed by default', () => {
    expect(wrapper.find(Snackbar).props().open).toBe(false);
  });

  it('New Consent Request: Button, should open Request Access modal on click', () => {
    wrapper.find(Button).props().onClick();
    expect(wrapper.find(Modal).props().open).toBe(true);
  });

  describe('After successful creation of consent', () => {
    let onCreateConsentResetState;
    let onSearchResetState;
    let loadConsents;
    let loadConfigValueSets;
    let landingPageWrapper;

    beforeAll(() => {
      onCreateConsentResetState = jest.fn();
      onSearchResetState = jest.fn();
      loadConsents = jest.fn();
      loadConfigValueSets = jest.fn();
      landingPageWrapper = shallow(
        <LandingPage
          success
          onCreateConsentResetState={onCreateConsentResetState}
          onSearchResetState={onSearchResetState}
          loadConsents={loadConsents}
          loadConfigValueSets={loadConfigValueSets}
        />
      );
      landingPageWrapper.find(Button).props().onClick(); // Open Modal
    });

    it('Success Message: Snackbar, should popup after successfully requesting a consent', () => {
      const successMessageSnackbar = landingPageWrapper.find(Snackbar);
      expect(successMessageSnackbar.props().open).toBe(true);
      expect(successMessageSnackbar.props().message).toBe(
        'Consent request initiated!'
      );
    });

    it('Success Message: Snackbar, should close popup on click of close icon', () => {
      landingPageWrapper.find(Snackbar).props().onClose();
      expect(landingPageWrapper.find(Snackbar).props().open).toBe(false);
    });

    it('should reload the consent list', () => {
      expect(loadConsents).toHaveBeenCalled();
    });

    it('should reset previously created consent creation state on close', () => {
      landingPageWrapper.find(Modal).props().onClose();
      expect(onCreateConsentResetState).toHaveBeenCalled();
    });

    it('should reset the previously searched patient state on close', () => {
      landingPageWrapper.find(Modal).props().onClose();
      expect(onSearchResetState).toHaveBeenCalled();
    });

    it('should reset the modal state on close button click', () => {
      landingPageWrapper.find(IconButton).simulate('click');
      expect(onSearchResetState).toHaveBeenCalled();
      expect(onCreateConsentResetState).toHaveBeenCalled();
    });
  });
});
