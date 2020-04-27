import React from "react";
import {shallow} from "enzyme";
import CCRDocument from "../../Composition/CCRDocument";
import ObservationTable from "../../ObservationTable/ObservationTable";
import DiagnosticReportComponent from "../../DiagnosticReport/DiagnosticReportComponent";
import MedicationRequestsComponent from "../../Medication/MedicationRequestsComponent";
import HealthInformationContent from "../HealthInformationContent.view";

describe('HealthInformationContent', ()=>{
    const mockData=[
        {
            resourceType: "MedicationRequest",
            status: "active",
            intent: "order",
            medicationReference:
                {
                    reference: "Medication/c2b8f3fd-6da0-44ed-bc91-8bb05ff614d2",
                    display: "IV antibiotics"
                },
            subject:
                {
                    display: "Shriya"
                },
            authoredOn: "2020-01-22",
            dosageInstruction: [
                {
                    sequence: 1,
                    text: "22/01/2020 to 07/02/2020",
                    timing: {
                        code: {
                            text: "15 days"
                        }
                    }
                }
            ]
        },
        {
            resourceType: "Composition",
            status: "active",
            intent: "order",
            medicationReference:
                {
                    reference: "Medication/c2b8f3fd-6da0-44ed-bc91-8bb05ff614d2",
                    display: "IV antibiotics"
                },
            subject:
                {
                    display: "Shriya"
                },
            authoredOn: "2020-01-22",
            dosageInstruction: [
                {
                    sequence: 1,
                    text: "22/01/2020 to 07/02/2020",
                    timing: {
                        code: {
                            text: "15 days"
                        }
                    }
                }
            ]
        },
        {
            resourceType: "Observation",
            status: "active",
            intent: "order",
            medicationReference:
                {
                    reference: "Medication/c2b8f3fd-6da0-44ed-bc91-8bb05ff614d2",
                    display: "IV antibiotics"
                },
            subject:
                {
                    display: "Shriya"
                },
            authoredOn: "2020-01-22",
            dosageInstruction: [
                {
                    sequence: 1,
                    text: "22/01/2020 to 07/02/2020",
                    timing: {
                        code: {
                            text: "15 days"
                        }
                    }
                }
            ]
        },
        {
            resourceType: "DiagnosticReport",
            status: "active",
            intent: "order",
            medicationReference:
                {
                    reference: "Medication/c2b8f3fd-6da0-44ed-bc91-8bb05ff614d2",
                    display: "IV antibiotics"
                },
            subject:
                {
                    display: "Shriya"
                },
            authoredOn: "2020-01-22",
            dosageInstruction: [
                {
                    sequence: 1,
                    text: "22/01/2020 to 07/02/2020",
                    timing: {
                        code: {
                            text: "15 days"
                        }
                    }
                }
            ]
        }
    ];
    const wrapper = shallow(
        <HealthInformationContent
            consentReqId={'123'}
            hipName={'Max Health Care'}
            data={mockData}
        />
    );

    it('should render properly', () => {
        expect(wrapper).toMatchSnapshot();
    });

    it('should render CCRDocument with composition data', () => {
        const mockData=[
            {
                resourceType: "Composition",
                status: "active",
                intent: "order",
                medicationReference:
                    {
                        reference: "Medication/c2b8f3fd-6da0-44ed-bc91-8bb05ff614d2",
                        display: "IV antibiotics"
                    },
                subject:
                    {
                        display: "Shriya"
                    },
                authoredOn: "2020-01-22",
                dosageInstruction: [
                    {
                        sequence: 1,
                        text: "22/01/2020 to 07/02/2020",
                        timing: {
                            code: {
                                text: "15 days"
                            }
                        }
                    }
                ]
            }
        ];
        wrapper.setProps({data:mockData});
        expect(wrapper.find(CCRDocument).props().compositionData).toEqual(mockData);
        expect(wrapper.find(CCRDocument).props().consentReqId).toEqual('123');
    });

    it('should render ObservationTable with data', () => {
        const mockData= [
            {
                resourceType: "Observation",
                status: "active",
                intent: "order",
                medicationReference:
                    {
                        reference: "Medication/c2b8f3fd-6da0-44ed-bc91-8bb05ff614d2",
                        display: "IV antibiotics"
                    },
                subject:
                    {
                        display: "Shriya"
                    },
                authoredOn: "2020-01-22",
                dosageInstruction: [
                    {
                        sequence: 1,
                        text: "22/01/2020 to 07/02/2020",
                        timing: {
                            code: {
                                text: "15 days"
                            }
                        }
                    }
                ]
            }
        ];
        wrapper.setProps({data:mockData});
        expect(wrapper.find(ObservationTable).props().data).toEqual(mockData);
    });

    it('should render DiagnosticReportComponent with data', () => {
        const mockData= [
            {
                resourceType: "DiagnosticReport",
                status: "active",
                intent: "order",
                medicationReference:
                    {
                        reference: "Medication/c2b8f3fd-6da0-44ed-bc91-8bb05ff614d2",
                        display: "IV antibiotics"
                    },
                subject:
                    {
                        display: "Shriya"
                    },
                authoredOn: "2020-01-22",
                dosageInstruction: [
                    {
                        sequence: 1,
                        text: "22/01/2020 to 07/02/2020",
                        timing: {
                            code: {
                                text: "15 days"
                            }
                        }
                    }
                ]
            }
        ];
        wrapper.setProps({data:mockData});
        expect(wrapper.find(DiagnosticReportComponent).props().data).toEqual(mockData);
        expect(wrapper.find(DiagnosticReportComponent).props().consentReqId).toEqual('123');
    });

    it('should render with no data', () => {
        wrapper.setProps({data:undefined});
        expect(wrapper.find(CCRDocument).props().compositionData).toEqual([]);
        expect(wrapper.find(ObservationTable).props().data).toEqual([]);
        expect(wrapper.find(DiagnosticReportComponent).props().data).toEqual([]);
        expect(wrapper.find(MedicationRequestsComponent).props().medicationRequests).toEqual([]);
    });
});