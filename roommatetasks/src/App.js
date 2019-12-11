import React from 'react';
import { Switch, Route, Link } from "react-router-dom";
import './App.css';
import { connect } from 'react-redux';
import Home from "./pages/Home";
import Login from "./pages/Login";
import DashBoard from "./pages/DashBoard";

const App = ( isLoggedIn ) => {
  return (
    <div className="App">
      <div className="nav-bar">
        <div>
          <Link to="/">Home</Link>
        </div>
        {isLoggedIn && (
          <div>
            <Link to="/login">Login</Link>
          </div>
        )}
        {!isLoggedIn && (
          <div>
            <Link to="/dashboard">Notes</Link>
          </div>
        )}
      </div>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/dashboard" component={DashBoard} />
        <Route path="/" component={Home} />
      </Switch>
    </div>
  );
}

const mapStateToProps = state => ({
  isLoggedIn: state.userReducer.isLoggedIn,
});

export default connect(mapStateToProps)(App);