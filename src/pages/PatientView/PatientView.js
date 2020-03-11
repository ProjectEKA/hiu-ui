import React, { useEffect } from "react";
import ObservationTable from "../../components/ObservationTable/ObservationTableContainer";
import DiagnosticReportTable from "../../components/DiagnosticReport/DiagnosticReportTableContainer";
import { useParams } from "react-router-dom";

const PatientView = ({ match }) => {
  //   const consentRequestId = match.params.id;
  //   useEffect(() => {
  //     loadHealthData(consentRequestId);
  //   }, []);

  //   function extractResources(healthInfo, resourceName) {
  //     if (healthInfo && healthInfo.entries) {
  //       const ResourceData = healthInfo.entries[0].data;
  //       if (ResourceData) {
  //         const Resources = ResourceData.entry.filter(
  //           item => item.resource.resourceType === resourceName
  //         );
  //         return Resources;
  //       }
  //     }
  //     return undefined;
  //   }

  //   function extractResourcesWithEntries(healthInfo, resourceName) {
  //     if (healthInfo && healthInfo.entries) {
  //       const ResourceData = healthInfo.entries[0].data;
  //       var Resources;
  //       if (ResourceData) {
  //         Resources = ResourceData.entry.filter(
  //           item =>
  //             item.resource.resourceType === resourceName &&
  //             (resourceName === "Observation"
  //               ? item.resource.hasMember
  //               : item.resource.result)
  //         );
  //         return Resources;
  //       }
  //     }
  //     return undefined;
  //   }

  //   const Observations = extractResources(healthInfo, "Observation");
  //   const DiagnosticReports = extractResources(healthInfo, "DiagnosticReport");
  //   const ObservationWithEntries = extractResourcesWithEntries(
  //     healthInfo,
  //     "Observation"
  //   );
  //   const DiagnosticReportWithEntries = extractResourcesWithEntries(
  //     healthInfo,
  //     "DiagnosticReport"
  //   );
  //   console.log(
  //     "***Obs***",
  //     Observations,
  //     "***DR***",
  //     DiagnosticReports,
  //     "***ObservationWithEntries***",
  //     ObservationWithEntries,
  //     "***DiagnosticReportWithEntries***",
  //     DiagnosticReportWithEntries
  //   );

  //   function generateFinalObservation(Obs, ObsWithEntries) {
  //     var finalObservation = [];
  //     var members;
  //     if (Obs && ObsWithEntries) {
  //       for (var key of ObsWithEntries) {
  //         members = key.resource.hasMember;
  //         finalObservation.push(key);
  //         for (var k = 0; k <= members.length - 1; k++) {
  //           const reference = members[k].reference.split("/")[1];
  //           for (var key1 of Obs) {
  //             const ObsWithEntriesReferenceId = key1.resource.id;
  //             if (reference === ObsWithEntriesReferenceId) {
  //               finalObservation.push(key1);
  //             }
  //           }
  //         }
  //       }
  //       return finalObservation;
  //     }
  //     return undefined;
  //   }

  //   function generateFinalDiagnosticResport(Obs, DRWithEntries) {
  //     var finalDR = [];
  //     var results;
  //     if (Obs && DRWithEntries) {
  //       for (var key of DRWithEntries) {
  //         results = key.resource.result;
  //         finalDR.push(key);
  //         for (var k = 0; k <= results.length - 1; k++) {
  //           const reference = results[k].reference.split("/")[1];
  //           for (var key1 of Obs) {
  //             const ObsWithEntriesReferenceId = key1.resource.id;
  //             if (reference === ObsWithEntriesReferenceId) {
  //               finalDR.push(key1);
  //             }
  //           }
  //         }
  //       }
  //       return finalDR;
  //     }
  //     return undefined;
  //   }

  //   const healthInformation = new Map();
  //   healthInformation.set(
  //     "observations",
  //     generateFinalObservation(Observations, ObservationWithEntries)
  //   );
  //   healthInformation.set(
  //     "diagnostReport",
  //     generateFinalDiagnosticResport(Observations, DiagnosticReportWithEntries)
  //   );
  //   const finalObservation = healthInformation.get("observation");
  //   console.log(healthInformation);

  return (
    <div>
      {/* <DiagnosticReportTable consentRequestId={match.params.id} /> */}
      <DiagnosticReportTable consentRequestId={match.params.id} />
      <ObservationTable consentRequestId={match.params.id} />

      {/* {finalObservation ? (
        <ObservationTable observations={finalObservation} />
      ) : (
        <div></div>
      )} */}
    </div>
  );
};

export default PatientView;
