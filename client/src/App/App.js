import React from 'react';
import Container from 'react-bootstrap/Container';
import { Header } from '../Components/Header/Header';
import { FormControl } from '../Containers/Form/FormControl';

export const App = () => (
  <>
    <Header />
    <Container>
      <FormControl />
    </Container>
  </>
);
