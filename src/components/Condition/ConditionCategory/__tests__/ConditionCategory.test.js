import React from 'react';
import { shallow } from 'enzyme';
import ConditionCategory from '../ConditionCategory.view';

describe('ConditionOnset', () => {
  const mockData = {
    category: [
      {
        text: 'Category 1',
        coding: {
          code: 'abc',
          display: 'abc text',
        },
      },
      {
        text: 'Category 2',
        coding: {
          code: 'abc',
          display: 'abc text',
        },
      },
    ],
  };
  const wrapper = shallow(
    <ConditionCategory condition={mockData} />
  );

  it('should render properly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should render category text', () => {
    expect(wrapper.find('span').at(0).text()).toEqual(' ( Category 1, Category 2 ) ');
  });

  it('should return empty object if condition data is undefined', () => {
    wrapper.setProps({condition:{category:null}});
    expect(wrapper.find('span').exists()).toEqual(false);
  });
});
