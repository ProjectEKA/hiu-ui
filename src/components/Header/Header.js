import React from "react";
import HeaderStyles from "./Header.style";
import NavigationBar from "../NavigationBar/NavigationBar";

const Header = () => {
  return (
    <HeaderStyles>
      <a href="/" className="logo">
        logo
      </a>
      <NavigationBar />
    </HeaderStyles>
  );
};

export default Header;
