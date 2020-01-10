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
  }
  .text-field-container {
    display: flex;
    align-items: center;
    margin-left: 20px;
    margin-bottom: 20px;
    .text-field-label {
      flex-basis: 20%;
      margin-right: 20px;
    }
  }
  .auto-complete {
    color: #009688;
    .text-field {
      color: #009688;
    }
  }
`;

export default RequestAccessStyles;
