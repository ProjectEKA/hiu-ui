import styled from 'styled-components';

const SearchPatientStyles = styled.div`
  .root {
    padding: 2px 2px 2px 10px;
    display: flex;
    align-items: center;
    width: 400;
  }
  .search-bar {
    display: flex;
    align-items: flex-start;
  }
  .fiduciary-text-field {
    width: 60px;
  }
  #search-field-helper-text {
    color: red;
  }
  .icon-button {
    margin-left: 15px;
    margin-top: -8px;
  }
`;

export default SearchPatientStyles;
