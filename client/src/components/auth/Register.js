import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

// Actions
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';

const Register = ({ setAlert, register, auth: { isAuthenticated, user } }) => {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    avatar: '',
    password: '',
    password2: ''
  });

  const { first_name, last_name, email, avatar, password, password2 } = formData;

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async e => {
    e.preventDefault();

    if (password !== password2) {
      setAlert('Passwords do not match', 'danger');
    } else {
      register({ first_name, last_name, email, avatar, password });
    }
  };

  if (isAuthenticated && user) {
    return <Redirect to='/dashboard' />;
  }

  return (
    <div className="auth-card-container register">
      <form onSubmit={e => onSubmit(e)}>
        <h1>Sign Up</h1>
        <div className="dual-field">
          <input
            type='text'
            placeholder='First name'
            name='first_name'
            value={first_name}
            onChange={e => onChange(e)}
          />
          <input
            type='text'
            placeholder='Last name'
            name='last_name'
            value={last_name}
            onChange={e => onChange(e)}
          />
        </div>
        <div>
          <input
            type='email'
            placeholder='Email Address'
            name='email'
            value={email}
            onChange={e => onChange(e)}
          />
        </div>
        <div>
          <input
            type='text'
            placeholder='Avatar URL'
            name='avatar'
            value={avatar}
            onChange={e => onChange(e)}
          />
        </div>
        <div>
          <input
            type='password'
            placeholder='Password'
            name='password'
            value={password}
            onChange={e => onChange(e)}
          />
        </div>
        <div>
          <input
            type='password'
            placeholder='Confirm Password'
            name='password2'
            value={password2}
            onChange={e => onChange(e)}
          />
        </div>
        <div className="submit-group">
          <input type='submit' value='Register' className="button" />
        </div>
        <p>
          Already have an account? <Link to='/login'>Sign In</Link>
        </p>
      </form>
    </div>
  );
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  auth: PropTypes.object
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { setAlert, register })(Register);
