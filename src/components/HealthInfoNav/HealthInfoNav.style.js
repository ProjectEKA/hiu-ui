import styled from 'styled-components';

const HealthInfoNavStyles = styled.div`
  .health-info-nav {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10px 0;
    font-family: "Roboto", sans-serif;
  }
  .date-navigator {
    display: flex;
    align-items: center;
  }
  .date-navigator-heading {
    padding: 10px 0 2px 0;
  }
  .date-text {
    padding: 0 10px;
  }
`;

export default HealthInfoNavStyles;
