import React from 'react';
import {shallow} from "enzyme";
import MedicationNote from "../MedicationNote.view";

describe('MedicationNote', () => {
    const mockData = {
        resourceType: 'MedicationRequest',
        status: 'active',
        note:[
            {
                text:'medication note 1'
            },
            {
                text:'medication note 2'
            }
        ]
    };
    const wrapper = shallow(
      <MedicationNote mr={mockData} />
    );

    it('should render properly', () => {
        expect(wrapper).toMatchSnapshot();
        expect(wrapper.find("li").exists()).toEqual(true);
    });

    it('should not render anything if data is undefined', () => {
        wrapper.setProps({mr:undefined});
        expect(wrapper.find("li").exists()).toEqual(false);
    });
});