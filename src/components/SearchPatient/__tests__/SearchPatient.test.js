import { shallow } from "enzyme";
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
    expect(wrapper.find(".icon-button").length).toEqual(2);
    expect(wrapper.find(SearchIcon).length).toBe(1);
    expect(wrapper).toMatchSnapshot();
  });
});
