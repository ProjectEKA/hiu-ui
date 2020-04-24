import React from 'react';
import { Redirect } from 'react-router-dom';
import { Header as StyledHeader, Logo, LogoutButton } from './Header.style';

const Header = () => {
  const [isLoggedOut, setIsLoggedOut] = React.useState(false);

  const logout = () => {
    localStorage.removeItem('auth-token');
    setIsLoggedOut(true);
  };

  return (
    <StyledHeader>
      {isLoggedOut && <Redirect to="/login" />}
      <Logo href={BASE_NAME}>
        logo
      </Logo>
      <LogoutButton onClick={logout}>
        Logout
      </LogoutButton>
    </StyledHeader>
  );
};

export default Header;
