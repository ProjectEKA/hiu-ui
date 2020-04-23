import { shallow } from "enzyme";
import React from "react";
import Header from "..";

describe("Header", () => {
  it("should render properly ", () => {
    global.BASE_NAME = "/";
    const wrapper = shallow(<Header />);
    expect(wrapper.debug()).toMatchSnapshot();
  });
});
