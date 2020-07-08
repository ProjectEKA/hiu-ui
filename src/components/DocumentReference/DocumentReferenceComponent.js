import React from 'react';
import * as PropTypes from 'prop-types';
import TableContainer from '@material-ui/core/TableContainer';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import DocumentReferenceComponentStyles from './DocumentReferenceComponent.style';
import { formatDateString, getCodingDisplay } from '../common/HealthInfo/FhirResourcesUtils';

const DocumentReferenceComponent = ({ data, consentReqId }) => {
  const authorArray = [];

  function extractAuthor(entry) {
    if (entry.author) {
      entry.author.forEach((author) => authorArray.push(author.display));
      return authorArray;
    }
    return undefined;
  }

  function extractContext(context) {
    if (context) {
      if (context.encounter) {
        if (context.encounter[0].display) {
          return context.encounter[0].display;
        }
        if (context.encounter[0].targetResource) {
          return getCodingDisplay(context.encounter[0].targetResource.class);
        }
      }
    }
    return undefined;
  }

  const renderContent = (entry) => (entry.content ? (
    <div>
      <span>Attachments : </span>
      <ul>
        {entry.content.map((contentAttachment) => (
          <li key={contentAttachment.attachment.url}>
            <a
              href={`${BACKEND_BASE_URL}${BACKEND_API_PATH}/health-information/fetch/${consentReqId}${contentAttachment.attachment.url}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {contentAttachment.attachment.title ? contentAttachment.attachment.title : 'Link'}
            </a>
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
            Clinical Document :
            {' '}
            {entry.type ? entry.type.text : ''}
          </Typography>
          <div className="document-reference">
            <ul className="report-details-list">
              <li>
                <span>Author: </span>
                {extractAuthor(entry)}
              </li>
              <li>
                <span>Date: </span>
                {entry.date
                  ? formatDateString(entry.date)
                  : ''}
              </li>
              <li>
                <span>Description: </span>
                {entry.description}
              </li>
              <li>
                <span>Status: </span>
                {entry.status}
              </li>
              <li>
                <span>Document Status: </span>
                {entry.docStatus}
              </li>
              <li>
                <span>Context: </span>
                {extractContext(entry.context)}
              </li>
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
    context: PropTypes.shape({ encounter: PropTypes.object }),
  })),
  consentReqId: PropTypes.string,
};

DocumentReferenceComponent.defaultProps = {
  data: [],
  consentReqId: null,
};

export default DocumentReferenceComponent;
