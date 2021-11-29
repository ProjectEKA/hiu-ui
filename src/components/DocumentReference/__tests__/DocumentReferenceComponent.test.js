import React from 'react';
import {shallow} from 'enzyme';
import TableContainer from '@material-ui/core/TableContainer';
import DocumentReferenceComponent from '../DocumentReferenceComponent';

describe('DocumentReferenceComponent', () => {
  const mockData = [
    {
      resourceType: 'DocumentReference',
      status: "current",
      docStatus: "final",
      type: {
        text: "Clinical Note",
        coding: [
            {
              system: "http://loinc.org",
              code: "34108-1",
              display: "Outpatient Note",
            },
            {
              system: "http://egovstandards.gov.in/mdds/CD05.046",
              code: "17",
              display: "Clinical Note",
            }
        ]
      },
      subject: {
        display: 'Shriya',
        reference: "Patient/RVH1003", 
      },
      date: "2019-12-24T09:43:41",
      description: "Human readable description - about the document",
      context: {
        encounter: [
          {
            reference: "Encounter/7fce6ec8-5013-4a27-b0a6-c43232608cda",
            display: "Ambulatory encounter - patient called in",
          }
        ],
        period: {
          start: "2019-12-24T08:43:41",
          end: "2019-12-24T10:43:41",
        }
      },
      content: [ 
        {
            attachment : {
                contentType: 'application/pdf',
                url: '/attachments/58d5e603-c994-4969-8199-95f7e0b0b738.pdf',
                title: 'BILATERAL DIGITAL MAMMOGRAPHY and 3D TOMOSYNTHESIS',
            }
        }
      ],
      author: [
        {
          display: "Dr. Manju Sengar",
          reference: "Practitioner/DHID1234"
        }
      ],
    },
  ];
  global.BACKEND_BASE_URL = 'http://localhost:3000/';
  global.BACKEND_API_PATH = 'hiu-api';
  global.TIMEZONE_OFFSET = '-05:00';
  const wrapper = shallow(
    <DocumentReferenceComponent
      data={mockData}
      consentReqId="123"
      enclosed={false}
    />,
  );

  it('should render properly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should show document details list with correct data', () => {
    expect(wrapper.find('.report-details-list li').at(0).text()).toEqual('Author: Dr. Manju Sengar');
    expect(wrapper.find('.report-details-list li').at(1).text()).toEqual('Date: 24/12/2019');
    expect(wrapper.find('.report-details-list li').at(2).text()).toEqual('Description: Human readable description - about the document');
  });

  it('should show date and Author as blank if data is not available', () => {
    mockData[0].date = null;
    mockData[0].author = undefined;
    wrapper.setProps({ data: mockData });
    expect(wrapper.find('.report-details-list li').at(0).text()).toEqual('Description: Human readable description - about the document');
    expect(wrapper.find('.report-details-list li').at(1).text()).toEqual('Status: current');
  });

  it('should Link text if title is not available of performer', () => {
    mockData[0].content[0].attachment.title = null;
    wrapper.setProps({ data: mockData });
    expect(wrapper.find('AttachmentLink').at(0).props().linkTitle).toEqual('Link');

    mockData[0].content= undefined;
    wrapper.setProps({ data: mockData });
    expect(wrapper.find('AttachmentLink').exists()).toEqual(false);
  });

  it('should not render anything if data is undefined', () => {
    wrapper.setProps({ data: undefined });
    expect(wrapper.find(TableContainer).exists()).toEqual(false);
  });
});
