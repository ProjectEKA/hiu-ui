import styled from "styled-components";

const NavigationBarStyles = styled.div`
  margin: 0 20px;
  ul {
    list-style: none;
    margin: 0;
    padding: 0;
    li {
      float: left;
      a {
        color: #000000;
        font-size: 16px;
        margin: 0 10px;
        padding: 23px 15px 21px;
        text-decoration: none;
        border-bottom: 4px solid transparent;
        &:hover {
          border-bottom: 4px solid #009688;
        }
      }
      a.active {
        border-bottom: 4px solid #009688;
      }
    }
  }
`;

export default NavigationBarStyles;
