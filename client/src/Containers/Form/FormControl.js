import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import { Formik } from 'formik';
import { BootstrapForm as Form } from '../../Components/Form/BootstrapForm';

const validate = values => {};
const onSubmit = (values, { setSubmitting, resetForm }, initial) => {
  console.log(values);
  resetForm();
  setSubmitting(false);
};

export const FormControl = () => {
  const [userExists, updateUserExists] = useState(true);
  const existence = () => {
    updateUserExists(!userExists);
  };
  return (
    <Container>
      <Formik
        initialValues={{ name: '', email: '', confirm: '', password: '' }}
        onSubmit={(values, { setSubmitting, resetForm }) =>
          onSubmit(values, { setSubmitting, resetForm })
        }
        validate={() => validate()}
      >
        {props => <Form {...props} userExists={userExists} existence={existence} />}
      </Formik>
    </Container>
  );
};
