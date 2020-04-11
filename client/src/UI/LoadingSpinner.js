import React, { useState, useEffect } from 'react';
import { Spinner, Row, Col } from 'react-bootstrap';
import styled from 'styled-components/macro';

const StyledCol = styled(Col)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 30vh;
`;

const StyledSpinner = styled(Spinner)`
  height: 7vh;
  width: 7vh;
`;

const Spin = () => (
  <Row>
    <StyledCol>
      <StyledSpinner animation="border" role="status" />
    </StyledCol>
  </Row>
);

export const LoadingSpinner = () => {
  const [show, changeShow] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      changeShow(true);
    }, 750);
  });
  return show ? <Spin /> : <></>;
};
