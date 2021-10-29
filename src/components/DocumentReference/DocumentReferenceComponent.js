import React from 'react';
import * as PropTypes from 'prop-types';
import TableContainer from '@material-ui/core/TableContainer';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import DocumentReferenceComponentStyles from './DocumentReferenceComponent.style';
import AttachmentLink from '../AttachmentLink';
import { formatDateString, getCodingDisplay } from '../common/HealthInfo/FhirResourcesUtils';


const DocumentReferenceComponent = ({ data, consentReqId, enclosed }) => {

  function extractAuthor(entry) {
    if (!entry.author) return undefined;
    return entry.author.map(author => author.display);
  }

  function extractContext(context) {
    if (!context) return undefined;
    if (!context.encounter) return undefined;
    if (context.encounter[0].display) {
      return context.encounter[0].display;
    }
    if (context.encounter[0].targetResource) {
      return getCodingDisplay(context.encounter[0].targetResource.class);
    }
    return undefined;
  }

  const renderContent = (entry) => (entry.content ? (
    <div>
      <span>Attachments : </span>
      <ul>
        {entry.content.map((contentAttachment) => (
          <li key={contentAttachment.attachment.url}>
            <AttachmentLink 
              consentReqId={consentReqId} 
              attachmentPath={contentAttachment.attachment.url} 
              linkTitle={contentAttachment.attachment.title ? contentAttachment.attachment.title : 'Link'} 
            />
          </li>
        ))}
      </ul>
    </div>
  ) : (
    <div />
  ));

  return data && data.length !== 0 ? (
    data.map((entry) => (
      <DocumentReferenceComponentStyles key={entry.date}>
        <TableContainer
          className="document-reference-table-container"
          component={Paper}
        >
          <Typography
            className="document-reference-header"
            variant="h6"
            component="h6"
          >
            {enclosed && 'Enclosed '}
            {' '}
            Clinical Document :
            {' '}
            {entry.type ? entry.type.text : ''}
          </Typography>
          <div className="document-reference">
            <ul className="report-details-list">
              {extractAuthor(entry) && (
                <li>
                  <span>Author: </span>
                  {extractAuthor(entry)}
                </li>
              )}
              {entry.date && (
                <li>
                  <span>Date: </span>
                  {formatDateString(entry.date)}
                </li>
              )}
              {entry.description && (
                <li>
                  <span>Description: </span>
                  {entry.description}
                </li>
              )}
              {entry.status && (
                <li>
                  <span>Status: </span>
                  {entry.status}
                </li>
              )}
              {entry.docStatus && (
                <li>
                  <span>Document Status: </span>
                  {entry.docStatus}
                </li>
              )}
              {extractContext(entry.context) && (
                <li>
                  <span>Context: </span>
                  {extractContext(entry.context)}
                </li>
              )}
            </ul>
            {renderContent(entry)}
          </div>
        </TableContainer>
      </DocumentReferenceComponentStyles>
    ))
  ) : (
    <div />
  );
};

DocumentReferenceComponent.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    type: PropTypes.shape({ text: PropTypes.string }),
    status: PropTypes.string,
    docStatus: PropTypes.string,
    date: PropTypes.string,
    author: PropTypes.arrayOf(PropTypes.shape({ display: PropTypes.string })),
    description: PropTypes.string,
    content: PropTypes.arrayOf(PropTypes.shape({
      attachment: PropTypes.object,
    })),
    context: PropTypes.shape({ encounter: PropTypes.array }),
  })),
  consentReqId: PropTypes.string,
  enclosed: PropTypes.bool
};

DocumentReferenceComponent.defaultProps = {
  data: [],
  consentReqId: null,
};

export default DocumentReferenceComponent;
