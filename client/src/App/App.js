import React from 'react';
import { Header } from '../Components/Header/Header';
import { FormControl } from '../Containers/Form/FormControl';
import Container from 'react-bootstrap/Container';

export const App = () => (
  <>
    <Header />
    <Container>
      <FormControl />
    </Container>
  </>
);