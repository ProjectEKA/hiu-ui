import React from "react";
import {shallow} from "enzyme";
import CCRDocument from "../CCRDocument";
import ObservationTable from "../../ObservationTable/ObservationTable";
import MedicationRequestsComponent from "../../Medication/MedicationRequestsComponent";

describe('CCRDocument', ()=>{
    const mockData= [
        {
            resourceType: "MedicationRequest",
            parentType:'Composition',
            status: "active",
            intent: "order",
            medicationReference: {reference: "Medication/c2b8f3fd-6da0-44ed-bc91-8bb05ff614d2", display: "IV antibiotics"},
            subject: {display: "Shriya"},
            authoredOn: "2020-01-22",
            dosageInstruction: []
        },
        {
            resourceType: "Observation",
            parentType:'Composition',
            status: "active",
            intent: "order",
            medicationReference: {reference: "Medication/c2b8f3fd-6da0-44ed-bc91-8bb05ff614d2", display: "IV antibiotics"},
            subject: {display: "Shriya"},
            authoredOn: "2020-01-22",
            dosageInstruction: []
        }
    ];
    const wrapper = shallow(
        <CCRDocument
            consentReqId={'123'}
            compositionData={mockData}
        />
    );

    it('should render properly', () => {
        expect(wrapper).toMatchSnapshot();
    });

    it('should render observation table component with empty data', () => {
        expect(wrapper.find(ObservationTable).length).toEqual(1);
        expect(wrapper.find(ObservationTable).props().data).toEqual([]);
    });

    it('should render Medication Requests component', () => {
        expect(wrapper.find(MedicationRequestsComponent).length).toEqual(1);
        expect(wrapper.find(MedicationRequestsComponent).props().medicationRequests).toEqual([]);
    });
});