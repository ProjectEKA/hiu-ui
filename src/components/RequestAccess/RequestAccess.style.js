import styled from "styled-components";

const RequestAccessStyles = styled.div`
  h2 {
    color: #000000;
    font-size: 24px;
    line-height: 24px;
    font-weight: 300;
    padding: 20px;
    margin-bottom: 30px;
    border-bottom: 1px solid #000000;
    font-family: "Roboto", sans-serif;
  }
  .label {
    display: block;
    color: #000;
    font-size: 16px;
    font-family: "Roboto", sans-serif;
  }
  .MuiGrid-container {
    padding: 10px 0;
  }
  .search-bar {
    vertical-align: center;
  }
  .auto-complete {
    color: #009688;
    .text-field {
      color: #009688;
    }
  }
  .error {
    display: block;
    padding: 10px 0;
    color: #f44336;
    font-size: 16px;
    font-family: "Roboto", sans-serif;
  }
`;

export default RequestAccessStyles;
