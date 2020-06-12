import { shallow, mount } from 'enzyme';
import React from 'react';
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';
import SearchPatient from '../SearchPatient';

describe('SearchPatient', () => {
  const mock = jest.fn();
  const props = {
    onSearch: mock,
    patientId: '1',
    loading: false,
    cmConfigList: [{ userIdSuffix: '@ncg' }]
  };

  it('should render properly', () => {
    const wrapper = shallow(<SearchPatient {...props} />);
    expect(wrapper.find('.icon-button').length).toEqual(1);
    expect(wrapper.find(SearchIcon).length).toBe(1);
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('#search-field').at(0).props().disabled).toBe(false);
  });

  it('should disable input field to edit, while loading the patient id', () => {
    props.loading = true;
    const wrapper = mount(<SearchPatient {...props} />);
    expect(wrapper.find('#search-field').at(0).props().disabled).toBe(true);

    expect(wrapper.find('#search-field').at(0).props().value).toBe(
      'Looking for ',
    );
  });

  it('should show error message when error occurs', () => {
    props.error = true;
    const wrapper = mount(<SearchPatient {...props} />);
    expect(wrapper.find('#search-field').at(0).props().helperText).toEqual('Id not found.');
  });

  it('should set input box value back to patient id after loading is done', () => {
    const wrapper = mount(<SearchPatient {...props} />);
    expect(wrapper.find('#search-field').at(0).props().disabled).toBe(true);
    expect(wrapper.find('#search-field').at(0).props().value).toBe(
      'Looking for ',
    );
  });

  it('Should reset the patient search state on changing the search text', () => {
    const onSearchResetState = jest.fn();
    const fakeEvent = { target: { value: 'Search Query' } };
    const wrapper = mount(
      <SearchPatient {...props} onSearchResetState={onSearchResetState} />,
    );
    wrapper.find(TextField).props().onChange(fakeEvent);
    expect(onSearchResetState).toHaveBeenCalled();
  });
});
