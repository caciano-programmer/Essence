import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import { Formik } from 'formik';
import { BootstrapForm as Form } from '../../Components/Form/BootstrapForm';
import { loginSchema, signupSchema } from '../../Utils/FormValidation';

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
        validationSchema={userExists ? loginSchema : signupSchema}
        onSubmit={(values, { setSubmitting, resetForm }) =>
          onSubmit(values, { setSubmitting, resetForm })
        }
        validateOnChange={false}
        validateOnBlur={false}
      >
        {props => <Form {...props} userExists={userExists} existence={existence} />}
      </Formik>
    </Container>
  );
};
