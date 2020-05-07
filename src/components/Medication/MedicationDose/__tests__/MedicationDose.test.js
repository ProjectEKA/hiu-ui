import React from 'react';
import {shallow} from "enzyme";
import MedicationDose from "../MedicationDose.view";
import DosingInstruction from "../../DosingInstruction";

describe('MedicationDose', () => {
    const mockData = [
        {
            sequence: 1,
            text: '22/01/2020 to 07/02/2020',
            timing: {
                event: ['22/1/2019'],
            },
        }
    ];
    const wrapper = shallow(
      <MedicationDose dosageInstructions={mockData} />
    );

    it('should render properly', () => {
        expect(wrapper).toMatchSnapshot();
        expect(wrapper.find(DosingInstruction).exists()).toEqual(true);
    });

    it('should not render anything if data is undefined', () => {
        wrapper.setProps({dosageInstructions:undefined});
        expect(wrapper.find(DosingInstruction).exists()).toEqual(false);
    });
});