import React from 'react';
import { Switch, Route } from "react-router-dom";
import './App.css';
import { connect } from 'react-redux';
import Home from "./pages/Home";
import Login from "./pages/Login";
import 'bootstrap/dist/css/bootstrap.min.css';
import Dashboard from "./pages/Dashboard";
import RegisterUser from "./pages/RegisterUser"

const App = (isLoggedIn) => {
  return (
    <div className="App">
      <Switch>
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/registeruser" component={RegisterUser} />
        <Route path="/login" component={Login} />
        {/* <Route path="/dashboard" component={Dashboard} /> */}
        <Route path="/" component={Home} />
      </Switch>
    </div>
  );
}

const mapStateToProps = state => ({
  isLoggedIn: state.userReducer.isLoggedIn,
});

export default connect(mapStateToProps)(App);