import React from 'react';
import { Switch, Route, Link } from "react-router-dom";
import './App.css';
import { connect } from 'react-redux';
import Home from "./pages/Home";
import Login from "./pages/Login";
import 'bootstrap/dist/css/bootstrap.min.css';
import Dashboard from "./pages/Dashboard";
import RegisterUser from "./pages/RegisterUser"

const App = ( isLoggedIn ) => {
  console.log("in app.js isLoggedIn value", isLoggedIn.isLoggedIn)
  let tempIsLoggedIn = isLoggedIn.isLoggedIn;
  return (
    <div className="App">      
      <link
        rel="stylesheet"
        href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
        integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
        crossorigin="anonymous"
      />
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
        <Route path="/" component={Home} />
      </Switch>
    </div>
  );
}

const mapStateToProps = state => ({
  isLoggedIn: state.userReducer.isLoggedIn,
});

export default connect(mapStateToProps)(App);