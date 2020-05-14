import styled from 'styled-components';

const RequestAccessStyles = styled.div`
  position: relative;
  height: 100%;

  .form-container {
    height: calc(100% - 110px);
    padding-right: 10px;
    overflow-y: auto;
  }

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
    margin-bottom: 12px;
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
    position: absolute;
    z-index: 99;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background: #fff;
    text-align: center;
  }
  .loader {
    margin-top: 40vh;
  }
  .request-type-label{
    margin-top:20px;
  }
`;

export default RequestAccessStyles;
