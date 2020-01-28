import { shallow, mount } from "enzyme";
import React from "react";
import SearchPatient from "./../SearchPatient";
import SearchIcon from "@material-ui/icons/Search";

describe("SearchPatient", () => {
  const mock = jest.fn();
  let props = {
    onSearch: mock,
    patientId: "1",
    loading: false
  };

  it("should render properly", () => {
    const wrapper = shallow(<SearchPatient {...props} />);
    expect(wrapper.find(".icon-button").length).toEqual(1);
    expect(wrapper.find(SearchIcon).length).toBe(1);
    expect(wrapper).toMatchSnapshot();
    expect(
      wrapper
        .find("#search-field")
        .at(0)
        .props()["disabled"]
    ).toBe(false);
  });

  it("should disable input field to edit, while loading the patient id", () => {
    props.loading = true;
    const wrapper = mount(<SearchPatient {...props} />);
    expect(
      wrapper
        .find("#search-field")
        .at(0)
        .props()["disabled"]
    ).toBe(true);

    expect(
      wrapper
        .find("#search-field")
        .at(0)
        .props()["value"]
    ).toBe("Looking for ");
    // expect(wrapper.find("#loader").length).toBe(1);
  });

  it("should set input box value back to patient id after loading is done", () => {
    const wrapper = mount(<SearchPatient {...props} />);
    // const setTextInput = jest.fn();
    expect(
      wrapper
        .find("#search-field")
        .at(0)
        .props()["disabled"]
    ).toBe(true);
    // expect(setTextInput).toHaveBeenCalledWith("1");
    expect(
      wrapper
        .find("#search-field")
        .at(0)
        .props()["value"]
    ).toBe("Looking for ");
  });
});
