import React from 'react';
import styled from 'styled-components/macro';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom';
import { NavDropdown } from 'react-bootstrap';

const AppName = 'Essence';
const Styled = css();

export const Header = () => (
  <Styled.Navbar bg="dark" variant="dark">
    <Link to="/">
      <Navbar.Brand>{AppName}</Navbar.Brand>
    </Link>
    <Nav>
      <Nav.Link eventKey="1" as="span">
        <Link to="/login">User</Link>
      </Nav.Link>
      <NavDropdown id="menu-dropdown" title="Menu">
        <NavDropdown.Item eventKey="2.1">Menu item</NavDropdown.Item>
        <NavDropdown.Item eventKey="2.2">Menu item</NavDropdown.Item>
      </NavDropdown>
    </Nav>
  </Styled.Navbar>
);

function css() {
  return {
    Navbar: styled(Navbar)`
      display: flex;
      justify-content: space-between;
    `,
  };
}
