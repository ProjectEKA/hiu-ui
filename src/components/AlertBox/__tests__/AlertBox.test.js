import React from "react";
import {shallow} from "enzyme";
import AlertBox from "../AlertBox.view";
import {Alert, AlertTitle} from "@material-ui/lab";

describe('AlertBox', ()=>{
    const wrapper = shallow(
        <AlertBox
            type={'info'}
            title={'Information'}
            message={'Health information is available!'}
        />
    );


    it('should render properly', () => {
        expect(wrapper).toMatchSnapshot();
    });

    it('should show title and message in alert box', () => {
        expect(wrapper.find(AlertTitle).text()).toContain('Information');
        expect(wrapper.find(Alert).text()).toContain('Health information is available!');
    });
});