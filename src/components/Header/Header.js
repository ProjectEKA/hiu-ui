import React from "react";
import HeaderStyles from "./Header.style";
import MaterialButton from "@material-ui/core/Button";
import NavigationBar from "../NavigationBar/NavigationBar";

const Header = () => {
  return (
    <HeaderStyles>
      <MaterialButton className="lo">logo</MaterialButton>
      <NavigationBar />
    </HeaderStyles>
  );
};

export default Header;
