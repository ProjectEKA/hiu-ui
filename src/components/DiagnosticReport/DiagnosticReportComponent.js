import React from "react";
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import DiagnosticReportComponentStyles from "./DiagnosticReportComponent.style";
import Typography from "@material-ui/core/Typography";
import { useParams } from "react-router-dom";
import getNestedObject from "../../utils/getNestedObject";
import ObservationTable from "../../components/ObservationTable/ObservationTable";
import { formatDateString } from "../common/HealthInfo/FhirResourcesUtils";

const DiagnosticReportComponent = ({ data, consentReqId }) => {
  const performerArray = [];
  function extractPerformer(entry) {
    if (entry.performer) {
      entry.performer.map(prmr => {
        performerArray.push(prmr.display);
      });
      return performerArray;
    }
    return undefined;
  }

  const PresentedForm = ({ entry }) => {
    return entry.presentedForm ? (
      <div>
        <span>Diagnostic report links and attachments : </span>
        <ul>
          {entry.presentedForm.map(link => {
            return (
              <li>
                <a
                  href={`${BACKEND_BASE_URL}/health-information/fetch/${consentReqId}${link.url}`}
                  target="_blank"
                >
                  {link.title ? link.title : "Link"}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    ) : (
      <div></div>
    );
  };

  function getResultsList(results, resourceType) {
    const referenceList = [];
    results
      ? results.map(result => {
          const resource = result.targetResource;
          referenceList.push(resource);
        })
      : undefined;
    return referenceList.filter(ref => (ref.resourceType = resourceType));
  }

  const Observations = ({ entry }) => {
    const ObsList = getResultsList(
      getNestedObject(entry, "result"),
      "Observations"
    );
    return <ObservationTable data={ObsList} />;
  };

  function getMediaList(results, resourceType) {
    const referenceList = [];
    results
      ? results.map(result => {
          const mediaLinkObject = {
            display: result.link.display ? result.link.display : "Media Link",
            url: result.link.targetResource.content.url,
            targetResource: result.link.targetResource
          };
          referenceList.push(mediaLinkObject);
        })
      : undefined;
    return referenceList.filter(
      ref => (ref.targetResource.resourceType = resourceType)
    );
  }

  const Media = ({ entry }) => {
    const MediaList = getMediaList(getNestedObject(entry, "media"), "Media");
    return MediaList && MediaList.length != 0 ? (
      <div>
        <span>Associated media : </span>
        <ul>
          {MediaList.map(link => {
            return (
              <li>
                <a href={`${BACKEND_BASE_URL}${link.url}`} target="_blank">
                  {link.display}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    ) : (
      <div></div>
    );
  };

  return data && data.length !== 0 ? (
    data.map(entry => {
      return (
        <DiagnosticReportComponentStyles>
          <TableContainer
            className="diagnostic-report-table-container"
            component={Paper}
          >
            <Typography
              className="diagnostic-report-header"
              variant="h6"
              component="h6"
            >
              Diagnostic report : {entry.code ? entry.code.text : ""}
            </Typography>
            <div className="diagnostic-report">
              <ul className="report-details-list">
                <li>
                  <span>Date: </span>
                  {entry.effectiveDateTime
                    ? formatDateString(entry.effectiveDateTime)
                    : "-"}
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
              <Observations entry={entry} />
              <PresentedForm entry={entry} />
              <Media entry={entry} />
            </div>
          </TableContainer>
        </DiagnosticReportComponentStyles>
      );
    })
  ) : (
    <div></div>
  );
};

export default DiagnosticReportComponent;
