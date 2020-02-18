import React, { useState } from 'react';
import { Formik } from 'formik';
import { BootstrapForm as Form } from '../../Components/Form/BootstrapForm';
import { loginSchema, signupSchema } from '../../Utils/LoginFormValidation';
import { Oauth } from '../../Components/Form/Oauth';
import { login, signup } from '../../Api/Authentication';

const onSubmit = (values, { setSubmitting, resetForm }) => {
  signup(values)
    .then(res => {
      console.log(res);
      resetForm();
      setSubmitting(false);
    })
    .catch(error => {
      console.log(error);
    });
};

export const FormControl = () => {
  const [userExists, updateUserExists] = useState(true);
  const existence = () => {
    updateUserExists(!userExists);
  };
  return (
    <>
      {userExists && <Oauth />}
      <Formik
        initialValues={{ name: '', email: '', confirm: '', password: '' }}
        validationSchema={userExists ? loginSchema : signupSchema}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          onSubmit(values, { setSubmitting, resetForm });
        }}
        validateOnChange={false}
        validateOnBlur={false}
      >
        {props => <Form {...props} userExists={userExists} existence={existence} />}
      </Formik>
    </>
  );
};
