import React from 'react';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';

// Components
import Navigation from './components/Navigation';
import Routes from './components/Routing/Routes';
import Landing from './components/Landing/Landing';

// Redux functions
import {setSession, logOut} from './actions/action'

const App = ({setSession, authenticated, logOut}) => {
  return (
    <div className='app'>
      <Navigation authenticated={authenticated} logOut={logOut} />
      <Switch>
        <Route exact path='/' component={Landing}/>
        <Routes setSession={setSession} authenticated={authenticated} />
      </Switch>
    </div>
  );
}

// State here refers to Redux State
const mapStateToProps = state => ({
  authenticated: state.session.authenticated
})

const mapDispatchToProps = dispatch => ({
  setSession: data => dispatch(setSession(data)),
  logOut: () =>  dispatch(logOut())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
