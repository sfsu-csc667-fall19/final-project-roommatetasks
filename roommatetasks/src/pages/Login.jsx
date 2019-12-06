import React from "react";

const Login = () => {
  return (
    <div>
      {/* navigtion bar is going here ! */}
      {/* <nav class="navbar bg-dark">
        <h1>
          <a href="index.html">
            <i class="fas fa-code"></i> Roommates
          </a>
        </h1>
        <ul>
          <li>
            <a href="profiles.html">Home</a>
          </li>
          <li>
            <a href="register.html">Register</a>
          </li>
          <li>
            <a href="login.html">Login</a>
          </li>
        </ul>
      </nav> */}

      <section className="container">
        <div className="alert alert-danger">Invalid User Name or Pasword</div>
        <h1 className="large text-primary">Sign In</h1>
        <p className="lead">
          <i className="fas fa-user"></i> Sign into Your Account
        </p>
        <form className="form" action="dashboard.html">
          <div className="form-group">
            <input
              type="email"
              placeholder="Email Address"
              name="email"
              required
            />
          </div>
          <div className="form-group">
            <input type="password" placeholder="Password" name="password" />
          </div>
          <input type="submit" className="btn btn-primary" value="Login" />
        </form>
        <p className="my-1">
          Don't have an account? <a href="register.html">Sign Up</a>
        </p>
      </section>
    </div>
  );
};

export default Login;
