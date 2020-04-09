import React from "react";
import ContainerStyles from "./Container.style";
import routes from "../../routes";
import { Switch, Route, Redirect } from "react-router-dom";

const Container = ({ isLoggedIn }) => {
  return (
    <ContainerStyles>
      <Switch>
        {routes.map((route) => {
          if (route.needAuth && isLoggedIn) {
            {
              <Redirect to="/" />;
            }
          } else {
            return (
              <Route
                exact={route.isExact}
                key={route.path}
                path={route.path}
                component={route.component}
              />
            );
          }
        })}
      </Switch>
    </ContainerStyles>
  );
};

export default Container;
