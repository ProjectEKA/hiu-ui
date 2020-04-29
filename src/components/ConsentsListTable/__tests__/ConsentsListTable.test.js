import React from 'react';
import { shallow } from 'enzyme';
import MaterialTable from 'material-table';
import ConsentsListTable from '../ConsentsListTable';

describe('ConsentsListTable', () => {
  const loadConsents = jest.fn();
  const mockData = [
    {
      patient: {
        firstName: 'John',
        lastName: 'Smith',
      },
      status: 'GRANTED',
      approvedDate: '2020-02-19T00:30:08.000+0000',
      expiredDate: '2020-02-20T03:17:48.603+0000',
      navLink: '',
    },
  ];
  const wrapper = shallow(
    <ConsentsListTable consentsList={mockData} loadConsents={loadConsents} theme="" />,
  );

  it('should render properly', () => {
    expect(wrapper).toMatchSnapshot();
    // expect(loadConsents).toHaveBeenCalled();
  });
  it('should render data in consent list when status is granted', () => {
    expect(wrapper.find(MaterialTable).length).toEqual(1);
    expect(wrapper.find(MaterialTable).props().data[0].name).toEqual('John Smith');
    expect(wrapper.find(MaterialTable).props().data[0].status).toEqual('Consent granted');
    expect(wrapper.find(MaterialTable).props().data[0].grantedOn).toEqual('19/2/2020');
    expect(wrapper.find(MaterialTable).props().data[0].expiredOn).toEqual('20/2/2020');
    expect(wrapper.find(MaterialTable).props().data[0].navLink).not.toEqual('');
  });

  it('should render data in consent list when status is not granted', () => {
    mockData[0].status = 'DENIED';
    wrapper.setProps({ consentsList: mockData });

    expect(wrapper.find(MaterialTable).length).toEqual(1);
    expect(wrapper.find(MaterialTable).props().data[0].name).toEqual('John Smith');
    expect(wrapper.find(MaterialTable).props().data[0].status).toEqual('Request sent');
    expect(wrapper.find(MaterialTable).props().data[0].grantedOn).toEqual('-');
    expect(wrapper.find(MaterialTable).props().data[0].expiredOn).toEqual('-');
    expect(wrapper.find(MaterialTable).props().data[0].navLink).toEqual('');
  });
});
