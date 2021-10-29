import React from 'react';
import * as PropTypes from 'prop-types';
import AttachmentLink from '../AttachmentLink';
import BinaryComponentStyles from './BinaryComponent.style';


const BinaryComponent = ({ data, consentReqId, enclosed }) => {

  const renderContent = (entry) => (entry.data ? (
    <div>
      <span>Attachments (Binary) : </span>
      <AttachmentLink 
        consentReqId={consentReqId} 
        attachmentPath={atob(entry.data)} 
        linkTitle="Link to Attachment"
      />
    </div>
  ) : (
    <div />
  ));

  return data && data.length !== 0 ? (
    data.map((entry, index) => (
      <BinaryComponentStyles key={index}>
        <div className="binary-reference">
          {renderContent(entry)}
        </div>
      </BinaryComponentStyles>
    ))
  ) : (
    <div />
  );
};

BinaryComponent.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    data: PropTypes.string,
    contentType: PropTypes.string,
  })),
  consentReqId: PropTypes.string,
  enclosed: PropTypes.bool
};

BinaryComponent.defaultProps = {
  data: [],
  consentReqId: null,
};

export default BinaryComponent;
