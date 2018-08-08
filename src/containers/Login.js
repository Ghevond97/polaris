import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { createStructuredSelector } from 'reselect';

import { login } from '../actions';

import { selectIsAuth, selectCurrentUser } from '../selectors';

import LogIn from '../components/LogIn';

const mapStateToProps = createStructuredSelector({
  isAuth: selectIsAuth,
  currentUser: selectCurrentUser,
});

const mapDispatchToProps = dispatch => ({
  login: user => dispatch(login(user)),
});

const LoginForm = reduxForm({
  form: 'Login_form',
})(LogIn);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginForm);
