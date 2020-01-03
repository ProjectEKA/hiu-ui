import React from "react";
import ContainerStyles from "./Container.style";
import routes from "../../routes";
import { Switch, Route } from "react-router-dom";

const Container = () => {
  return (
    <ContainerStyles>
      <Switch>
        {routes.map(route => (
          <Route
            key={route.path}
            path={route.path}
            component={route.component}
          />
        ))}
      </Switch>
    </ContainerStyles>
  );
};

export default Container;
