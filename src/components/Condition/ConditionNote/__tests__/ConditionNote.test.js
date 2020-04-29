import React from 'react';
import { shallow } from 'enzyme';
import ConditionNote from '../ConditionNote.view';

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
      <ConditionNote condition={mockData} />,
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should return empty object if condition data is undefined', () => {
    wrapper = shallow(<ConditionNote />);
    expect(wrapper.find('li').exists()).toEqual(false);
  });
});
