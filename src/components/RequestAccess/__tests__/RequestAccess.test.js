import { shallow } from "enzyme";
import React from "react";
import RequestAccess from "../RequestAccess";

describe("Request Access", () => {
  it("should render properly ", () => {
    const wrapper = shallow(<RequestAccess />);
    expect(wrapper.debug()).toMatchSnapshot();
  });
});
