import React from "react";
import { IconButton } from "@material-ui/core";
import { ChevronLeft, ChevronRight } from "@material-ui/icons";
import HealthInfoNavStyles from "./HealthInfoNav.style";

const HealthInfoNav = ({ dates, selectedDate, setSelectedDate }) => {
  function selectNextDate(dates, selectedDate) {
    const nextIndex = dates.indexOf(selectedDate) + 1;
    setSelectedDate(dates[nextIndex]);
  }

  function selectPreviousDate(dates, selectedDate) {
    const previousIndex = dates.indexOf(selectedDate) - 1;
    setSelectedDate(dates[previousIndex]);
  }

  return (
    <HealthInfoNavStyles>
      <div className="health-info-nav">
        <span className="date-navigator-heading">View by recorded date</span>
        <div className="date-navigator">
          <IconButton
            disabled={
              dates && dates !== [] ? dates.indexOf(selectedDate) === 0 : false
            }
            type="button"
            className="icon-button"
            aria-label="search"
            theme="primary"
            size="small"
            onClick={() => selectPreviousDate(dates, selectedDate)}
          >
            <ChevronLeft variant="outlined" theme="primary" />
          </IconButton>
          <div className="date-text">{selectedDate}</div>
          <IconButton
            disabled={
              dates && dates !== []
                ? dates.indexOf(selectedDate) === dates.length - 1
                : false
            }
            type="button"
            className="icon-button"
            aria-label="search"
            theme="primary"
            size="small"
            onClick={() => selectNextDate(dates, selectedDate)}
          >
            <ChevronRight variant="outlined" theme="primary" />
          </IconButton>
        </div>
      </div>
    </HealthInfoNavStyles>
  );
};

export default HealthInfoNav;
