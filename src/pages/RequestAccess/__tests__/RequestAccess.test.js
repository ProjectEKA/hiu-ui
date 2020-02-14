import React from "react";
import { shallow } from "enzyme";
import RequestAccess from "../RequestAccess";
import DatePicker from "../../../../src/components/DateTimePicker/DatePicker";
import DateTimePicker from "../../../../src/components/DateTimePicker/DateTimePicker";
import SimpleMenu from "../../../../src/components/SimpleMenu/SimpleMenu";
// import RequestType from "../../../../src/components/RequestType/RequestType";
// import requestTypes from "./../../../constants/requestTypes";

describe("Request Access", () => {
  let realDate;

  beforeEach(() => {
    const currentDate = new Date("2019-05-14T11:01:58.135Z");
    realDate = Date;
    global.Date = class extends Date {
      constructor(date) {
        if (date) {
          return super(date);
        }
        return currentDate;
      }
    };
  });

  afterEach(() => {
    // Cleanup
    global.Date = realDate;
  });

  it("Should render properly", () => {
    const wrapper = shallow(<RequestAccess />);
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find(DatePicker).length).toEqual(2);
    expect(wrapper.find(DateTimePicker).length).toEqual(1);
  });

  it("Purpose of request, should have referral services selected by default", () => {
    const wrapper = shallow(<RequestAccess />);
    expect(wrapper.find(SimpleMenu).props().selectedValue).toEqual(
      "ReferralService"
    );
  });

  it("From: date component, should have current date when no date is selected ", () => {
    const wrapper = shallow(<RequestAccess />);
    expect(
      wrapper
        .find(DatePicker)
        .at(0)
        .props().selectedDate
    ).toEqual("2019-05-14T11:01:58.135Z");
  });

  it("To: date component, should have current date when no date is selected ", () => {
    const wrapper = shallow(<RequestAccess />);
    expect(
      wrapper
        .find(DatePicker)
        .at(1)
        .props().selectedDate
    ).toEqual("2019-05-14T11:01:58.135Z");
  });

  it("Expiry: date component, should have next day as current date when no date is selected ", () => {
    const wrapper = shallow(<RequestAccess />);
    const ActualExpiryDate = wrapper.find(DateTimePicker).props().selectedDate;
    const expectedExpiryDate = "2019-05-15T11:01:58.135Z";
    expect(ActualExpiryDate).toEqual(expectedExpiryDate);
  });
});
