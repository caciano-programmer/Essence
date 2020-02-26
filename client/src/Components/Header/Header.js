import React from 'react';
import styled from 'styled-components/macro';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

const AppName = 'Essence';

const StyledNavbar = styled(Navbar)`
  display: flex;
  justify-content: space-between;
`;

export const Header = () => (
  <StyledNavbar bg="dark" variant="dark">
    <Navbar.Brand href="home">{AppName}</Navbar.Brand>
    <Nav>
      <Nav.Link>User</Nav.Link>
      <Nav.Link>Menu</Nav.Link>
    </Nav>
  </StyledNavbar>
);
