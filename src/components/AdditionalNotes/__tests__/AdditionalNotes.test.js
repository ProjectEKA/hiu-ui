import React from 'react';
import { shallow } from 'enzyme';
import AdditionalNotes from '../AdditionalNotes.view';

describe('ConditionNote', () => {
  let wrapper;

  it('should render properly', () => {
    const mockData = {
      note: [
        {
          text: 'condition note 1',
        },
        {
          text: 'condition note 2',
        },
      ],
    };
    wrapper = shallow(
      <AdditionalNotes condition={mockData} />,
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should return empty object if condition data is undefined', () => {
    wrapper = shallow(<AdditionalNotes />);
    expect(wrapper.find('li').exists()).toEqual(false);
  });
});
