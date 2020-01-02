import styled from "styled-components";

const HeaderStyles = styled.div`
  display: flex;
  align-items: center;
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 64px;
  padding: 0;
  background: #fff;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.24);
  z-index: 50;
  .logo {
    margin-left: 24px;
    width: 80px;
    height: 40px;
    background-color: #009688;
    color: #fff;
  }
`;

export default HeaderStyles;
