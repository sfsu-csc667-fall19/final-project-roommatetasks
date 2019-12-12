import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";


const Header = () => {
    return (
        <div className="container-fluid">
            <header className="fixed-top">
                <div className="container-fluid">
                    <nav className="navbar navbar-expand-lg bg-dark navbar-dark" id="main-nav">
                        <a class="navbar-brand" href="/">Roommate Tasks</a>
                        <Button className="navbar-toggler" data-toggle="collapse" data-target="#navbarCollapse">
                            <span className="navbar-toggler-icon"></span>
                        </Button>
                        <div className="collapse navbar-collapse" id="navbarCollapse">
                            <ul className="navbar-nav ml-auto">
                                <li className="nav-item">
                                    <a href="/" className="nav-link btn btn-outline-primary">Home</a>
                                </li>
                                <li className="nav-item">
                                    <a href="#" className="nav-link btn btn-outline-warning" data-toggle="modal"
                                        data-target="#loginModal">Log In</a>
                                </li>
                            </ul>
                        </div>
                    </nav>
                </div>
            </header>

            <div className="modal fade" id="loginModal">
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
        </div>
    );
};

export default Header;