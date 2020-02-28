import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import propTypes from 'prop-types';

/* eslint-disable jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions, react/forbid-prop-types */

const BootstrapForm = ({ userExists, existence, handleSubmit, handleChange, handleReset, errors, values }) => {
  const changeUserStatus = () => {
    existence();
    handleReset();
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h1>{userExists ? 'Sign In' : 'Sign Up'}</h1>
      {!userExists && (
        <Form.Group>
          <Form.Label>Name:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter desired profile name"
            name="name"
            value={values.name}
            onChange={handleChange}
            maxLength={30}
          />
          {errors.name && <Form.Text className="text-muted">{errors.name}</Form.Text>}
        </Form.Group>
      )}
      <Form.Group>
        <Form.Label>Email:</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter email"
          name="email"
          value={values.email}
          onChange={handleChange}
          maxLength={255}
        />
        {errors.email && <Form.Text className="text-muted">{errors.email}</Form.Text>}
      </Form.Group>
      {!userExists && (
        <Form.Group>
          <Form.Label>Confirm Email:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Confirm your email"
            name="confirm"
            value={values.confirm}
            onChange={handleChange}
            maxLength={255}
          />
          {errors.confirm && <Form.Text className="text-muted">{errors.confirm}</Form.Text>}
        </Form.Group>
      )}
      <Form.Group>
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          name="password"
          value={values.password}
          onChange={handleChange}
          maxLength={40}
        />
        {errors.password && <Form.Text className="text-muted">{errors.password}</Form.Text>}
        {userExists && (
          <Form.Text className="text-muted">
            <u>Forgot Password?</u>
          </Form.Text>
        )}
      </Form.Group>
      <Form.Row>
        <Form.Check type="checkbox" label="Remember me?" className="col" defaultChecked />
        {userExists && (
          <Form.Text className="col">
            <u onClick={changeUserStatus}>Need to create account?</u>
          </Form.Text>
        )}
        {!userExists && (
          <Form.Text className="col">
            <u onClick={changeUserStatus}>Already have an account?</u>
          </Form.Text>
        )}
      </Form.Row>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};

BootstrapForm.propTypes = {
  userExists: propTypes.bool.isRequired,
  existence: propTypes.func.isRequired,
  handleChange: propTypes.func.isRequired,
  handleSubmit: propTypes.func.isRequired,
  handleReset: propTypes.func.isRequired,
  errors: propTypes.object.isRequired,
  values: propTypes.object.isRequired,
};

export { BootstrapForm };
