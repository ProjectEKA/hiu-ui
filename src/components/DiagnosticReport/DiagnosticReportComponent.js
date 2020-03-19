import React from "react";
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import DiagnosticReportComponentStyles from "./DiagnosticReportComponent.style";
import Typography from "@material-ui/core/Typography";
import { useParams } from "react-router-dom";
import { toIndiaDate } from "../../constants";
import getNestedObject from "../../utils/getNestedObject";
import ObservationTable from "../../components/ObservationTable/ObservationTable";

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
        <span>Presented form : </span>
        <ul>
          {entry.presentedForm.map(link => {
            return (
              <li>
                <a
                  href={`${BACKEND_BASE_URL}/health-information/fetch/${consentReqId}${link.url}`}
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

  return data && data.length !== 0 ? (
    data.map(entry => {
      return (
        <DiagnosticReportComponentStyles>
          <TableContainer
            className="diagnostic-report-container "
            component={Paper}
          >
            <Typography className="header" variant="h6" component="h6">
              {entry.resourceType}
            </Typography>
            <ul className="report-details-list">
              <li>
                <span>Date: </span>
                {entry.effectiveDateTime
                  ? toIndiaDate(entry.effectiveDateTime)
                  : "-"}
              </li>
              <li>
                <span>Status: </span>
                {entry.status}
              </li>
              <li>
                <span>Report: </span>
                {entry.code ? entry.code.text : ""}
              </li>
              <li>
                <span>Performer: </span>
                {extractPerformer(entry)}
              </li>
            </ul>
            <Observations entry={entry} />
            <PresentedForm entry={entry} />
          </TableContainer>
        </DiagnosticReportComponentStyles>
      );
    })
  ) : (
    <div></div>
  );
};

export default DiagnosticReportComponent;
