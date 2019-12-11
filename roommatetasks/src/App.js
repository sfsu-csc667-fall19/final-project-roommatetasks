import React from 'react';
import { Switch, Route, Link } from "react-router-dom";
import './App.css';
import { connect } from 'react-redux';
import Home from "./pages/Home";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import RegisterUser from "./pages/RegisterUser";
import dBoard from "./pages/DashBoard";

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
        <div>
          <Link to ="/registeruser"> Register </Link>
        </div>
        <div>
          <Link to ="/dashboard"> Dashboard </Link>
        </div>
      </div>
      <Switch>
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/registeruser" component={RegisterUser} />
        <Route path="/login" component={Login} />
        {/* <Route path="/dashboard" component={Dashboard} /> */}
        <Route path="/board" component={dBoard}/>
        <Route path="/" component={Home} />
      </Switch>
    </div>
  );
}

const mapStateToProps = state => ({
  isLoggedIn: state.userReducer.isLoggedIn,
});

export default connect(mapStateToProps)(App);