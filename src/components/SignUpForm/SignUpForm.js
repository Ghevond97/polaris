import React from 'react';
import { Field } from 'redux-form';
import { Redirect } from 'react-router-dom';
import { Alert } from 'react-bootstrap';
import { PropTypes } from 'prop-types';

import renderField from './RenderField';
import SubmitBtn from '../SubmitBtn';

import './styles.css';

const SignUpForm = ({
  signUp,
  handleSubmit,
  isSignUp,
  location,
  valid,
  isRequesting,
  errorSignUp,
  formTitle,
}) => {
  const { from } = location.state || { from: { pathname: '/login' } };
  return isSignUp ? (
    <Redirect to={from} />
  ) : (
    <div className="sign-up-form">
      <form onSubmit={handleSubmit(signUp)}>
        <h1>{formTitle}</h1>
        <Field
          name="username"
          type="text"
          component={renderField}
          placeholder="Username"
          bsSize="large"
          className="input"
        />
        <Field
          name="email"
          type="email"
          component={renderField}
          placeholder="Email"
          bsSize="large"
          className="input"
        />
        <Field
          name="password"
          type="password"
          component={renderField}
          placeholder="Password"
          bsSize="large"
          className="input"
        />
        <Field
          name="passwordConformation"
          type="password"
          component={renderField}
          placeholder="Password Conformation"
          bsSize="large"
          className="input"
        />
        <Field
          name="userType"
          type="hidden"
          component={renderField}
          className="hidden-input"
        />
        {isRequesting && <Alert bsStyle="info">Please wait...</Alert>}
        {errorSignUp && <Alert bsStyle="danger">{errorSignUp}</Alert>}
        <SubmitBtn
          value="CREATE ACCOUNT!"
          valid={valid}
          isRequesting={isRequesting}
        />
      </form>
    </div>
  );
};

SignUpForm.propTypes = {
  signUp: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  isSignUp: PropTypes.bool.isRequired,
  location: PropTypes.object.isRequired,
  valid: PropTypes.bool.isRequired,
  isRequesting: PropTypes.bool.isRequired,
  errorSignUp: PropTypes.object.isRequired,
  formTitle: PropTypes.string.isRequired,
};

SignUpForm.defaultProps = {};

export default SignUpForm;
