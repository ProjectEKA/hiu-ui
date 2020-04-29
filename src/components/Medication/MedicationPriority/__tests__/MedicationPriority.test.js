import React from 'react';
import {shallow} from "enzyme";
import MedicationPriority from "../MedicationPriority.view";

describe('MedicationPriority', () => {
    const mockData = {
        priority:'Medication priority'
    };
    const wrapper = shallow(
      <MedicationPriority mr={mockData} />
    );

    it('should render properly', () => {
        expect(wrapper).toMatchSnapshot();
        expect(wrapper.find("li").exists()).toEqual(true);
    });

    it('should not render anything if data is undefinde', () => {
        wrapper.setProps({mr:undefined});
        expect(wrapper.find("li").exists()).toEqual(false);
    });
});