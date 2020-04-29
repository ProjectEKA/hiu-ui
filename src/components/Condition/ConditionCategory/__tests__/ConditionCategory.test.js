import React from 'react';
import { shallow } from 'enzyme';
import ConditionCategory from '../ConditionCategory.view';

describe('ConditionOnset', () => {
  let wrapper;

  it('should render properly', () => {
    const mockData = {
      category: [
        {
          text: 'category',
          coding: {
            code: 'abc',
            display: 'abc text',
          },
        },
      ],
    };
    wrapper = shallow(<ConditionCategory condition={mockData} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should return empty object if condition data is undefined', () => {
    wrapper = shallow(<ConditionCategory condition={undefined} />);
    expect(wrapper.find('span').exists()).toEqual(false);
  });
});
