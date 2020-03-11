import styled from "styled-components";

const DiagnosticReportTableStyles = styled.div`
  .diagnostic-report-table-container {
    margin-bottom: 20px;
  }
  .diagnostic-report-table {
    min-width: 650px;
  }
  .header {
    text-transform: uppercase;
    letter-spacing: 1px;
    margin-top: 40px;
  }
  .table-head {
    background-color: #c8c8c8;
  }
  .loader-container {
    display: flex;
    align-items: center;
    flex-direction: column;
  }
  .expand-button {
    margin-right: 10px;
  }
  .close {
    display: none;
  }
`;

export default DiagnosticReportTableStyles;
