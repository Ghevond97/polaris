import React from 'react';
import { Field } from 'redux-form';
import { Redirect } from 'react-router-dom';

import RenderField from './RenderField';
import SubmitBtn from '../SubmitBtn';

import './styles.css';

const LogIn = ({
  handleSubmit,
  login,
  isAuth,
  location,
  currentUser,
  lang,
  valid,
}) => {
  const redirectPath = isAuth
    ? currentUser.userType === 'audience_owner'
      ? 'audience'
      : 'contentowner'
    : '';
  const { from } = location.state || {
    from: { pathname: `/${redirectPath}`, search: `?locale=${lang}` },
  };

  return isAuth ? (
    <Redirect to={from} />
  ) : (
    <div className="login-form-wrapper">
      <div className="login-form">
        <form onSubmit={handleSubmit(login)}>
          <Field
            name="username"
            component={RenderField}
            type="text"
            bsSize="large"
            placeholder="Your Username"
            className="login-input"
          />
          <Field
            name="password"
            component={RenderField}
            type="password"
            placeholder="Your Password"
            bsSize="large"
            className="login-input"
          />
          <SubmitBtn value="Log In" valid={valid} />
        </form>
      </div>
    </div>
  );
};

export default LogIn;
