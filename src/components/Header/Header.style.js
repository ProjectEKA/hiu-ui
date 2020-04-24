import React from 'react';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';


export const LogoutButton = styled(({ ...rest }) => <Button {...rest} variant="contained" color="primary" />)`
    margin-right: 1em;
`;

export const Logo = styled.a`
    color: #fff;
    background-color: #dedede;
    margin-left: 1em;
    text-transform: uppercase;
    text-decoration: none;
    justify-content: center;
`;


export const Header = styled(({ ...rest }) => <Box {...rest} boxShadow={3} />)`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    position: fixed;
    top: 0;
    left: 0;
    padding: 1em 0;
    width: 100%;
    z-index: 50;
    background: #fff;
`;
