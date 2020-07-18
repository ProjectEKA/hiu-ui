import React from 'react';
import * as PropTypes from 'prop-types';
import axios from 'axios';

const AttachmentLink = ({ consentReqId, attachmentPath, linkTitle }) => {
  const openAttachment = async e => {
    e.preventDefault();

    const response = await axios({
      headers:{ Authorization: localStorage.getItem('auth-token') },
      method: 'get',
      url: `/health-information/fetch/${consentReqId}${attachmentPath}`,
      baseURL: BACKEND_BASE_URL + BACKEND_API_PATH,
      responseType: 'blob'
    });

    const blob = new Blob([response.data]);
    const fileUrl = URL.createObjectURL(blob);
    const attachmentName = attachmentPath.split('/').reverse()[0];

    const link = document.createElement('a');
    link.href = fileUrl;
    link.download = attachmentName;

    // this is necessary as link.click() does not work on the some versions of firefox
    link.dispatchEvent(
      new MouseEvent('click', { 
        bubbles: true, 
        cancelable: true, 
        view: window 
      })
    );
  };

  return <a href={'#'} onClick={openAttachment}>{linkTitle}</a>;
};

AttachmentLink.propTypes = {
  consentReqId: PropTypes.string,
  attachmentPath: PropTypes.string,
  linkTitle: PropTypes.string
};

export default AttachmentLink;
