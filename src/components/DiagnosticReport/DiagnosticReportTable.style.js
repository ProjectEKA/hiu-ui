import styled from "styled-components";

const DiagnosticReportTableStyles = styled.div`
  .observation-table {
    min-width: 650px;
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
