import React from 'react';
import * as PropTypes from 'prop-types';
import TableContainer from '@material-ui/core/TableContainer';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import DiagnosticReportComponentStyles from './DiagnosticReportComponent.style';
import getNestedObject from '../../utils/getNestedObject';
import ObservationTable from '../ObservationTable/ObservationTable';
import { formatDateString } from '../common/HealthInfo/FhirResourcesUtils';

const DiagnosticReportComponent = ({ data, consentReqId }) => {
  const performerArray = [];

  function extractPerformer(entry) {
    if (entry.performer) {
      entry.performer.forEach((performer) => performerArray.push(performer.display));
      return performerArray;
    }
    return undefined;
  }

  const renderPresentedForm = (entry) => (entry.presentedForm ? (
    <div>
      <span>Diagnostic report links and attachments : </span>
      <ul>
        {entry.presentedForm.map((link) => (
          <li key={link.url}>
            <a
              href={`${BACKEND_BASE_URL}${BACKEND_API_PATH}health-information/fetch/${consentReqId}${link.url}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {link.title ? link.title : 'Link'}
            </a>
          </li>
        ))}
      </ul>
    </div>
  ) : (
    <div />
  ));

  function getResultsList(results, resourceType) {
    const referenceList = [];
    if (results) results.forEach((result) => referenceList.push(result.targetResource));
    return referenceList.filter((ref) => (ref.resourceType === resourceType));
  }

  const renderObservations = (entry) => {
    const ObsList = getResultsList(
      getNestedObject(entry, 'result'),
      'Observations',
    );

    return <ObservationTable data={ObsList} />;
  };

  function getMediaList(results, resourceType) {
    const referenceList = [];
    if (results) {
      results.forEach((result) => {
        const mediaLinkObject = {
          display: result.link.display ? result.link.display : 'Media Link',
          url: result.link.targetResource.content.url,
          targetResource: result.link.targetResource,
        };
        referenceList.push(mediaLinkObject);
      });
    }

    return referenceList.filter((ref) => ref.targetResource.resourceType === resourceType);
  }

  function generateImageUrl(url) {
    const urlArray = url.split('/');
    const StudyInstanceUID = urlArray.slice(-1).pop();
    const dicomCtx = btoa(DICOM_SERVER_PATH);

    const dicomUrl = `${window.location.origin
    }/viewer/${
      StudyInstanceUID
    }?dicomCtx=${
      dicomCtx}`;
    return dicomUrl;
  }

  const renderMedia = (entry) => {
    const MediaList = getMediaList(getNestedObject(entry, 'media'), 'Media');
    return MediaList && MediaList.length !== 0 ? (
      <div>
        <span>Associated media : </span>
        <ul>
          {MediaList.map((link) => (
            <li key={link.url}>
              <a
                href={generateImageUrl(link.url)}
                target="_blank"
                rel="noopener noreferrer"
              >
                {link.display}
              </a>
            </li>
          ))}
        </ul>
      </div>
    ) : (
      <div />
    );
  };

  return data && data.length !== 0 ? (
    data.map((entry) => (
      <DiagnosticReportComponentStyles key={entry.effectiveDateTime}>
        <TableContainer
          className="diagnostic-report-table-container"
          component={Paper}
        >
          <Typography
            className="diagnostic-report-header"
            variant="h6"
            component="h6"
          >
            Diagnostic report :
            {' '}
            {entry.code ? entry.code.text : ''}
          </Typography>
          <div className="diagnostic-report">
            <ul className="report-details-list">
              <li>
                <span>Date: </span>
                {entry.effectiveDateTime
                  ? formatDateString(entry.effectiveDateTime)
                  : '-'}
              </li>
              <li>
                <span>Status: </span>
                {entry.status}
              </li>
              <li>
                <span>Performer: </span>
                {extractPerformer(entry)}
              </li>
            </ul>
            {renderObservations(entry)}
            {renderPresentedForm(entry)}
            {renderMedia(entry)}
          </div>
        </TableContainer>
      </DiagnosticReportComponentStyles>
    ))
  ) : (
    <div />
  );
};

DiagnosticReportComponent.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.shape({ text: PropTypes.string }),
    status: PropTypes.string,
    effectiveDateTime: PropTypes.string,
    performer: PropTypes.arrayOf(PropTypes.shape({ display: PropTypes.string })),
    presentedForm: PropTypes.arrayOf(PropTypes.shape({
      url: PropTypes.string,
      title: PropTypes.string,
    })),
  })),
  consentReqId: PropTypes.string,
};

DiagnosticReportComponent.defaultProps = {
  data: [],
  consentReqId: null,
};

export default DiagnosticReportComponent;
