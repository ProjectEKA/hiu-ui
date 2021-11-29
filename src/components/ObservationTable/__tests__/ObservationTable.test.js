import React from 'react';
import {shallow} from "enzyme";
import TableContainer from "@material-ui/core/TableContainer";
import ObservationTable, {Components} from "../ObservationTable";

describe('ObservationTable', () => {
    const mockData = [
        {
            resourceType: "Observation",
            status: "final",
            code: {text: "Vital signs Panel"},
            subject: {display: "Shriya"},
            component:[
                {
                    valueString:'value',
                    code:{
                        text:'Text'
                    }
                }
            ]
        },
    ];
    global.TIMEZONE_OFFSET = '-05:00';
    const wrapper = shallow(
      <ObservationTable data={mockData} />
    );

    it('should render properly', () => {
        expect(wrapper).toMatchSnapshot();
        expect(wrapper.find(TableContainer).exists()).toEqual(true);
    });

    it('should render date in table data', () => {
        expect(wrapper.find('.table-cell').at(0).text()).toEqual('');
        mockData[0].effectiveDateTime = "2020-01-03";
        wrapper.setProps({data:mockData});
        expect(wrapper.find('.table-cell').at(0).text()).toEqual('02/01/2020 07:00 PM');
    });

    it('should render class name according to the condition', () => {
        expect(wrapper.find('.parent-row').exists()).toEqual(true);
        expect(wrapper.find('.children-row').exists()).toEqual(false);
        mockData[0].id = '1';
        wrapper.setProps({data:mockData});
        expect(wrapper.find('.parent-row').exists()).toEqual(false);
        expect(wrapper.find('.children-row').exists()).toEqual(true);
        expect(wrapper.find('.table-cell').at(0).text()).toEqual('02/01/2020 07:00 PM');
    });

    it('should render code text in table data', () => {
        expect(wrapper.find('.table-cell').at(1).text()).toEqual('Vital signs Panel');
        expect(wrapper.find(Components).props().components).toEqual(mockData[0].component);
    });

    it('should render interpretation text in table data', () => {
        expect(wrapper.find('.table-cell').at(3).text()).toEqual('final');
        mockData[0].interpretation=[
            {
                text:'text'
            }
        ];
        wrapper.setProps({data:mockData});
        expect(wrapper.find('.table-cell').at(3).text()).toEqual('finaltext');
    });

    it('should not render anything if no data found', () => {
        wrapper.setProps({data:undefined});
        expect(wrapper.find(TableContainer).exists()).toEqual(false);
    });
});