import React from 'react';
import {shallow} from "enzyme";
import {Typography} from "@material-ui/core";
import DischargeSummary from "../DischargeSummary.view";

describe('DischargeSummary', () => {
    let wrapper;
    global.TIMEZONE_OFFSET = '-05:00';

    beforeEach(() => {
        wrapper = shallow(
          <DischargeSummary
            title="Discharge Summary"
            startDate="2018-04-01T15:30:10+01:00"
            endDate="2018-04-10T15:30:10+01:00"
            authors={['abc', 'xyz']}
            status="final"
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
        expect(DischargeSummary.defaultProps.authors).toEqual([]);
        expect(DischargeSummary.defaultProps.status).toEqual('');
    });

    it('should not render anything if title is empty', () => {
        wrapper.setProps({title:''});
        expect(wrapper.find(Typography)).toHaveLength(0);
    });

    describe('Period', () => {
        it('should render period if startDate is not empty', () => {
            expect(wrapper.find('span[className*="period"]')).toHaveLength(1);
        });

        it('should not render period if startDate is empty', () => {
            wrapper.setProps({ startDate: '' });
            expect(wrapper.find('span[className*="period"]')).toHaveLength(0);
        });

        it('should render period if endDate is not empty', () => {
            expect(wrapper.find('span[className*="period"]')).toHaveLength(1);
        });

        it('should not render period if endDate is empty', () => {
            wrapper.setProps({ endDate: '' });
            expect(wrapper.find('span[className*="period"]')).toHaveLength(0);
        });
    });

    describe('Authors', () => {
        it('should render author if it is not empty', () => {
            const labels = wrapper.find('span[className*="label"]');
            expect(labels.first().text()).toContain("Authors: ");
        });

        it('should not render author if it is empty', () => {
            wrapper.setProps({ authors: [] });
            const labels = wrapper.find('span[className*="label"]');
            expect(labels.first().text()).not.toContain("Authors: ");
        });
    });

    describe('Status', () => {
        it('should render status if it is not empty', () => {
            const labels = wrapper.find('span[className*="label"]');
            expect(labels.at(1).text()).toContain("Status: ");
        });

        it('should not render status if it is empty', () => {
            wrapper.setProps({ status: '' });
            const labels = wrapper.find('span[className*="label"]');
            expect(labels).toHaveLength(1);
            expect(labels.first().text()).not.toContain("Status: ");
        });
    });
});
