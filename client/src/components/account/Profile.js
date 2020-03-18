import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const Profile = ({ user }) => {
  const [formData, setFormData] = useState({
    first_name: user.first_name,
    last_name: user.last_name,
    email: user.email,
    avatar: user.avatar || '',
    gender: user.gender || ''
  });

  const { first_name, last_name, email, avatar, gender } = formData;

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async e => {
    e.preventDefault();

    try {
    } catch (err) {
      // TODO: Front-end errors, send in redux action?
      console.log(err);
    }
  };

  return (
    <Fragment>
      <h1>Profile</h1>
      <h2>Account Information</h2>
      <p>
        <i className='fas fa-user' /> Edit your Account
      </p>
      <form onSubmit={e => onSubmit(e)}>
        <div>
          <input
            type='text'
            placeholder='First name'
            name='first_name'
            value={first_name}
            onChange={e => onChange(e)}
          />
        </div>
        <div>
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
        <input type='submit' value='Save' />
        <h2>General Information</h2>
        <p>
          <i className='fas fa-user' /> Edit your Information
        </p>
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
            type='text'
            placeholder='Gender'
            name='gender'
            value={gender}
            onChange={e => onChange(e)}
          />
        </div>
        <input type='submit' value='Save' />
      </form>
    </Fragment>
  );
};

Profile.propTypes = {
  user: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  user: state.auth.user
});

export default connect(mapStateToProps)(Profile);
