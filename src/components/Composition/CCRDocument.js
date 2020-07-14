import React from 'react';
import * as PropTypes from 'prop-types';
import CompositionComponent from './CompositionComponent';

const CCRDocument = ({ compositionData, consentReqId }) => {
  const compositions = compositionData.filter(node => node.resourceType.toLowerCase() === "composition");
  return compositions ? (
    compositions.map((compositon) => (
      <div style={{ marginBottom: 50 }}>
        <CompositionComponent
          composition={compositon}
          consentReqId={consentReqId}
          resources={compositionData}
        />
      </div>
    ))
  ) : (
    <div />
  );
};

const compositionDataShape = PropTypes.shape({
  resourceType: PropTypes.string,
  parentResources: PropTypes.arrayOf(PropTypes.shape({
    resourceType: PropTypes.string,
  })),
});

CCRDocument.propTypes = {
  compositionData: PropTypes.arrayOf(compositionDataShape).isRequired,
  consentReqId: PropTypes.string.isRequired
};

export default CCRDocument;
