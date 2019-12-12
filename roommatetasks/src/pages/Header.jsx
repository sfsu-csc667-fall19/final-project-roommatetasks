import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";


const Header = () => {
  return (
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
  );
};

export default Header;