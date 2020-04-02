import React from "react";
import HeaderStyles from "./Header.style";

const Header = () => {
  return (
    <HeaderStyles>
      <a href={BASE_NAME} className="logo">
        logo
      </a>
    </HeaderStyles>
  );
};

export default Header;
