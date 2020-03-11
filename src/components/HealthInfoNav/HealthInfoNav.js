import React from "react";
import { IconButton } from "@material-ui/core";
import { ChevronLeft, ChevronRight } from "@material-ui/icons";
import HealthInfoNavStyles from "./HealthInfoNav.style";

const HealthInfoNav = ({ dates, selectedDate }) => {
  const [newSelectedDate, setNewSelectedDate] = React.useState(selectedDate);

  function selectNextDate(dates, selectedDate) {
    const nextIndex = dates.indexOf(selectedDate) + 1;
    setNewSelectedDate(dates[nextIndex]);
  }

  function selectPreviousDate(dates, selectedDate) {
    const previousIndex = dates.indexOf(selectedDate) - 1;
    setNewSelectedDate(dates[previousIndex]);
  }

  return (
    <HealthInfoNavStyles>
      <div className="health-info-nav">
        <span className="date-navigator-heading">View by recorded date</span>
        <div className="date-navigator">
          <IconButton
            disabled={dates.indexOf(newSelectedDate) === 0}
            type="button"
            className="icon-button"
            aria-label="search"
            theme="primary"
            size="small"
            onClick={() => selectPreviousDate(dates, newSelectedDate)}
          >
            <ChevronLeft variant="outlined" theme="primary" />
          </IconButton>
          <div className="date-text">{newSelectedDate}</div>
          <IconButton
            disabled={dates.indexOf(newSelectedDate) === dates.length - 1}
            type="button"
            className="icon-button"
            aria-label="search"
            theme="primary"
            size="small"
            onClick={() => selectNextDate(dates, newSelectedDate)}
          >
            <ChevronRight variant="outlined" theme="primary" />
          </IconButton>
        </div>
      </div>
    </HealthInfoNavStyles>
  );
};

export default HealthInfoNav;
