import React from 'react';
import {shallow} from "enzyme";
import {Typography} from "@material-ui/core";
import DischargeSummary from "../DischargeSummary.view";

describe('DischargeSummary', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(
          <DischargeSummary
            title="Discharge Summary"
            startDate="2018-04-01T15:30:10+01:00"
            endDate="2018-04-10T15:30:10+01:00"
          />
        );
    });

    it('should render properly', () => {
        expect(wrapper).toMatchSnapshot();
    });

    it('should have default props', () => {
        expect(DischargeSummary.defaultProps.title).toEqual('');
        expect(DischargeSummary.defaultProps.startDate).toEqual('');
        expect(DischargeSummary.defaultProps.endDate).toEqual('');
    });

    it('should not render description if startDate is empty', () => {
        wrapper.setProps({startDate: ''});
        expect(wrapper.find('span')).toHaveLength(0);
    });

    it('should not render description if endDate is empty', () => {
        wrapper.setProps({endDate: ''});
        expect(wrapper.find('span')).toHaveLength(0);
    });

    it('should not render anything if title is empty', () => {
        wrapper.setProps({title:''});
        expect(wrapper.find(Typography)).toHaveLength(0);
    });
});