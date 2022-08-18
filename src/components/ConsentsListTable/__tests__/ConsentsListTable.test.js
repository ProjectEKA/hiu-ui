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
      createdDate: '2020-02-18T03:17:48.603+0000',
      navLink: '',
    },
  ];
  global.TIMEZONE_OFFSET = '-05:00';
  const wrapper = shallow(
    <ConsentsListTable consentsList={mockData} loadConsents={loadConsents} theme="" />,
  );

  it('should render properly', () => {
    expect(wrapper).toMatchSnapshot();
    // expect(loadConsents).toHaveBeenCalled();
  });

  it('should render data in consent list when status is granted', () => {
    expect(wrapper.find(MaterialTable).length).toEqual(1);
    console.log(wrapper.find(MaterialTable).props().data[0].expiredOn);
    expect(wrapper.find(MaterialTable).props().data[0].name).toEqual('John Smith');
    expect(wrapper.find(MaterialTable).props().data[0].status).toEqual('Consent Granted');
    expect(wrapper.find(MaterialTable).props().data[0].grantedOn).toEqual('18/02/2020 07:30 PM');
    expect(wrapper.find(MaterialTable).props().data[0].expiredOn).toEqual('19/02/2020 10:17 PM');
    expect(wrapper.find(MaterialTable).props().data[0].createdOn).toEqual('17/02/2020 10:17 PM');
    expect(wrapper.find(MaterialTable).props().data[0].navLink).not.toEqual('');
  });

  it('should render data in consent list when status is not granted', () => {
    mockData[0].status = 'DENIED';
    wrapper.setProps({ consentsList: mockData });

    expect(wrapper.find(MaterialTable).length).toEqual(1);
    expect(wrapper.find(MaterialTable).props().data[0].name).toEqual('John Smith');
    expect(wrapper.find(MaterialTable).props().data[0].status).toEqual('Request Denied');
    expect(wrapper.find(MaterialTable).props().data[0].grantedOn).toEqual('-');
    expect(wrapper.find(MaterialTable).props().data[0].expiredOn).toEqual('-');
    expect(wrapper.find(MaterialTable).props().data[0].createdOn).toEqual('17/02/2020 10:17 PM');
    expect(wrapper.find(MaterialTable).props().data[0].navLink).toEqual('');
  });

  it('should have refresh actions', () => {
    expect(wrapper.find(MaterialTable).props().actions[0].icon).toEqual('refresh');
    expect(wrapper.find(MaterialTable).props().actions[0].isFreeAction).toEqual(true);
    expect(wrapper.find(MaterialTable).props().actions[0].tooltip).toEqual("Refresh");
    expect(wrapper.find(MaterialTable).props().actions[0].onClick).toBeDefined();
  });

  it('should have default props', () => {
    expect(ConsentsListTable.defaultProps.loading).toEqual(false);
  });
});
