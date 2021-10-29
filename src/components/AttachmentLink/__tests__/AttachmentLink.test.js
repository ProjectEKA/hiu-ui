import React from 'react';
import { shallow } from 'enzyme';
import AttachmentLink from '../AttachmentLink.view';

describe('AttachmentLink', () => {
  it('should render properly', () => {
    const wrapper = shallow(
      <AttachmentLink
        consentReqId="some-uuid"
        attachmentPath="/attachments/some-path"
        linkTitle="Link"
      />
    );
    expect(wrapper).toMatchSnapshot();
  });
});
