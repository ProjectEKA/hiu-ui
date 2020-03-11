import React from "react";
import { NavLink } from "react-router-dom";
import NavigationBarStyles from "./NavigationBar.style";

const NavigationBar = () => {
  return (
    <NavigationBarStyles>
      <nav>
        <ul>
          <li key="request-access">
            <NavLink activeClassName="active" to="/request-access">
              Request access
            </NavLink>
          </li>
          <li key="Patient-view">
            <NavLink activeClassName="active" to="/patient-view">
              Patient view
            </NavLink>
          </li>
          <li key="consent-log">
            <NavLink activeClassName="active" to="/consent-log">
              Consent log
            </NavLink>
          </li>
          <li key="consent-log">
            <NavLink activeClassName="active" to="/health-info">
              Health Info
            </NavLink>
          </li>
        </ul>
      </nav>
    </NavigationBarStyles>
  );
};

export default NavigationBar;
