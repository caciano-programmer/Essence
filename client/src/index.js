import React from 'react';
import ReactDOM from 'react-dom';
import { Normalize } from 'styled-normalize';
import Container from 'react-bootstrap/Container';
import { Header } from './Header/Header';
import { Authentication } from './Features/Authentication/Containers/Authentication';
import { Home } from './Features/Home/Components/home';
import { App } from './Features/App/Components/app';
import { Group } from './Features/Group/Components/group';
import { Profile } from './Features/Profile/Components/profile';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <>
    <Normalize />
    <Header />
    <Container>
      <Home />
      <App />
      <Group />
      <Profile />
      <Authentication />
    </Container>
  </>,
  document.getElementById('root'),
);

serviceWorker.unregister();
