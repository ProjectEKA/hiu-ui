import React from "react";
import { shallow } from "enzyme";
import Button from "@material-ui/core/Button";
import LandingPage from "../LandingPage";
import { Modal, Snackbar, jssPreset } from "@material-ui/core";

describe("Lading Page", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<LandingPage />);
  });

  it("should render properley", () => {
    expect(wrapper.debug()).toMatchSnapshot();
  });

  it("Request Access: Modal, should be closed by default", () => {
    expect(wrapper.find(Modal).props().open).toBe(false);
  });

  it("Success Message: Snackbar, should be closed by default", () => {
    expect(wrapper.find(Snackbar).props().open).toBe(false);
  });

  it("New Consent Request: Button, should open Request Access modal on click", () => {
    wrapper.find(Button).props().onClick();
    expect(wrapper.find(Modal).props().open).toBe(true);
  });

  describe("After successful creation of consent", () => {
    let onCreateConsentResetState, onSearchResetState, loadConsents, wrapper;

    beforeAll(() => {
      onCreateConsentResetState = jest.fn();
      onSearchResetState = jest.fn();
      loadConsents = jest.fn();
      wrapper = shallow(
        <LandingPage
          success={true}
          onCreateConsentResetState={onCreateConsentResetState}
          onSearchResetState={onSearchResetState}
          loadConsents={loadConsents}
        />
      );
      wrapper.find(Button).props().onClick(); //Open Modal
    });

    it("Success Message: Snackbar, should popup after successfully requesting a consent", () => {
      const successMessageSnackbar = wrapper.find(Snackbar);
      expect(successMessageSnackbar.props().open).toBe(true);
      expect(successMessageSnackbar.props().message).toBe(
        "Consent requested successfully!"
      );
    });

    it("should reload the consent list", () => {
      expect(loadConsents).toHaveBeenCalled();
    });

    it("should reset previously created consent creation state on close", () => {
      wrapper.find(Modal).props().onClose();
      expect(onCreateConsentResetState).toHaveBeenCalled();
    });
  
    it("should reset the previously searched patient state on close", () => {
      wrapper.find(Modal).props().onClose();
      expect(onSearchResetState).toHaveBeenCalled();
    });
  });
});
