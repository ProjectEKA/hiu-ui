import styled from "styled-components";

export const HeaderStyles = styled.div`
  height: 60px;
  background-color: ${props =>
    props.hello === "hello" ? "#c3c3c3" : "#cacaca"};
`;

export const HeaderSpan = styled.div`
  height: 60px;
  background-color: #ccc;
`;

const OuterDiv = styled.div`
  .header {
    background-color: green;
    height: 56px;
  }
`;

export default OuterDiv;
