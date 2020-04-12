import styled from "styled-components";

const RequestAccessStyles = styled.div`
  h2 {
    color: #000000;
    font-size: 24px;
    line-height: 24px;
    font-weight: 300;
    padding: 20px 0;
    margin-bottom: 25px;
    border-bottom: 1px solid #000000;
    font-family: "Roboto", sans-serif;
  }
  .text-field-label {
    color: #000;
  }
  .label {
    display: block;
    color: #000;
    font-size: 16px;
    font-weight: 300;
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
  .create-consent-button {
    margin-top: 25px;
  }
  .error {
    display: block;
    padding: 20px 0 0px;
    color: #f44336;
    font-size: 16px;
    font-weight: 300;
    font-family: "Roboto", sans-serif;
  }
  .loader-container {
    position: fixed;
    z-index: 99;
    left: 0;
    top: 75px;
    background: #fff;
    width: 100%;
    height: 100%;
    align-items: center;
    display: flex;
    justify-content: center;
  }
`;

export default RequestAccessStyles;
