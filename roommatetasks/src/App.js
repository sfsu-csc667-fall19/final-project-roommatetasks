import React from 'react';
import { Switch, Route, Link } from "react-router-dom";
import './App.css';
import { connect } from 'react-redux';
import Home from "./pages/Home";
import Login from "./pages/Login";
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';

const App = (isLoggedIn) => {
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
            <Link to="/notes">Notes</Link>
          </div>
        )}
      </div>
      <header className="fixed-top">
        <div className="container-fluid">
          <nav className="navbar navbar-expand-lg bg-dark navbar-dark" id="main-nav">
            <Button className="navbar-toggler" data-toggle="collapse" data-target="#navbarCollapse">
              <span className="navbar-toggler-icon"></span>
            </Button>
            <div className="collapse navbar-collapse" id="navbarCollapse">
              <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link className="nav-link btn btn-outline-primary" to="/">Home</Link>
                </li>
                <li className="nav-item">
                  <a href="#" className="nav-link btn btn-outline-warning offset-md-2" data-toggle="modal"
                    data-target="#loginModal">Log In</a>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </header>

      <div className="modal fade" id="loginModal" tabindex="-1" role="dialog" aria-labelledby="loginModalLabel"
        aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="loginModalLabel">Log In</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form>
                <div className="form-group">
                  <label for="loginEmail">Email address</label>
                  <input type="email" className="form-control" id="loginEmail" aria-describedby="emailHelp"
                    placeholder="Enter email" required></input>
                </div>
                <div className="form-group">
                  <label for="loginPw">Password</label>
                  <input type="password" className="form-control" id="loginPw" placeholder="Password" required></input>
                </div>
                <button type="submit" className="btn btn-primary">Log In</button>
              </form>
            </div>
            <div className="modal-footer">
              <Link className="btn btn-warning" to="/signup">Sign Up</Link>
              <a href="#">Forgot Password</a>
            </div>
          </div>
        </div>
      </div>
      <Switch>
        <Route path="/login" component={Login} />
        {/* <Route path="/notes" component={Notes} /> */}
        <Route path="/" component={Home} />
      </Switch>
    </div>
  );
}

const mapStateToProps = state => ({
  isLoggedIn: state.userReducer.isLoggedIn,
});

export default connect(mapStateToProps)(App);