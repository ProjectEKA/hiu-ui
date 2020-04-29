import React from 'react';
import {shallow} from "enzyme";
import PatientDetails from "../PatientDetails.view";

describe('PatientDetails', () => {
    const wrapper = shallow(
      <PatientDetails firstName="John" />
    );

    it('should render properly', () => {
        expect(wrapper).toMatchSnapshot();
    });

    it('should render name with firstname', () => {
        expect(wrapper.find("span").at(0).text()).toEqual('Name :John')
    });
});