import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Oauth } from './Oauth';

export const BootstrapForm = props => {
  const changeUserStatus = () => {
    props.existence();
    props.handleReset();
  };
  return (
    <>
      {props.userExists && <Oauth />}
      <Form onSubmit={props.handleSubmit}>
        <h1>{props.userExists ? 'Sign In' : 'Sign Up'}</h1>
        {!props.userExists && (
          <Form.Group>
            <Form.Label>Name:</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter desired profile name'
              name='name'
              value={props.values.name}
              onChange={props.handleChange}
            />
            <Form.Text className='text-muted'>Name error</Form.Text>
          </Form.Group>
        )}
        <Form.Group>
          <Form.Label>Email:</Form.Label>
          <Form.Control
            type='email'
            placeholder='Enter email'
            name='email'
            value={props.values.email}
            onChange={props.handleChange}
          />
          <Form.Text className='text-muted'>Email error</Form.Text>
        </Form.Group>
        {!props.userExists && (
          <Form.Group>
            <Form.Label>Confirm Email:</Form.Label>
            <Form.Control
              type='email'
              placeholder='Confirm your email'
              name='confirm'
              value={props.values.confirm}
              onChange={props.handleChange}
            />
            <Form.Text className='text-muted'>Email error</Form.Text>
          </Form.Group>
        )}
        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Password'
            name='password'
            value={props.values.password}
            onChange={props.handleChange}
          />
          <Form.Text className='text-muted'>Password error</Form.Text>
          {props.userExists && (
            <Form.Text className='text-muted'>
              <u>Forgot Password?</u>
            </Form.Text>
          )}
        </Form.Group>
        <Form.Row>
          <Form.Check type='checkbox' label='Remember me?' className='col' defaultChecked />
          {props.userExists && (
            <Form.Text className='col'>
              <u onClick={changeUserStatus}>Need to create account?</u>
            </Form.Text>
          )}
          {!props.userExists && (
            <Form.Text className='col'>
              <u onClick={changeUserStatus}>Already have an account?</u>
            </Form.Text>
          )}
        </Form.Row>
        <Button variant='primary' type='submit'>
          Submit
        </Button>
      </Form>
    </>
  );
};
