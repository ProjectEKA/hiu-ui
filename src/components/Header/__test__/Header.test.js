import { shallow } from "enzyme";
import React from "react";
import Header from "../Header";

describe("Header", () => {
  it("should render properly ", () => {
    const wrapper = shallow(<Header />);
    expect(wrapper.debug()).toMatchSnapshot();
  });
});
