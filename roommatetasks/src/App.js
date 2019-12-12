import React from 'react';
import { Switch, Route, Link } from "react-router-dom";
import './App.css';
import { connect } from 'react-redux';
import Home from "./pages/Home";
import Login from "./pages/Login";
import Dashboard from "../src/pages/Dashboard";
import RegisterUser from "./pages/RegisterUser";
// import DBoard from "../pages/DBoard";

const App = ( isLoggedIn ) => {
  console.log("in app.js isLoggedIn value", isLoggedIn.isLoggedIn)
  let tempIsLoggedIn = isLoggedIn.isLoggedIn;
  return (
    <div className="App">
      <div className="nav-bar">
        <div>
          <Link to="/">Home</Link>
        </div>
        {!tempIsLoggedIn && (
          <div>
            <Link to="/login">Login</Link>
          </div>
        )}
        {!tempIsLoggedIn && (
          <div>
          <Link to ="/registeruser"> Register </Link>
        </div>
        )}
        
        <div>
          <Link to ="/dashboard"> Dashboard </Link>
        </div>
      </div>
      <Switch>
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/registeruser" component={RegisterUser} />
        <Route path="/login" component={Login} />
        {/* <Route path="/dashboard" component={Dashboard} /> */}
        {/* <Route path="/board" component={DBoard}/> */}
        <Route path="/" component={Home} />
      </Switch>
    </div>
  );
}

const mapStateToProps = state => ({
  isLoggedIn: state.userReducer.isLoggedIn,
});

export default connect(mapStateToProps)(App);