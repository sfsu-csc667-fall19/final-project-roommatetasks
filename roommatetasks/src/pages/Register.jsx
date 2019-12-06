import React from "react";
const Register = () => {
  return (
    <div>
      {/* Navigation bar is going here ! */}

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
        <h1 className="large text-primary">Sign Up</h1>
        <p className="lead">
          <i className="fas fa-user"></i> Create Your Account
        </p>
        <form className="form" action="create-profile.html">
          <div className="form-group">
            <input type="text" placeholder="First Name" name="name" required />
          </div>
          <div className="form-group">
            <input type="text" placeholder="Last Name" name="name" required />
          </div>
          <div className="form-group">
            <input type="email" placeholder="Email Address" name="email" />
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              name="password"
              minlength="6"
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Confirm Password"
              name="password2"
              minlength="6"
            />
          </div>
          <input type="submit" className="btn btn-primary" value="Register" />
        </form>
        <p className="my-1">
          Already have an account? <a href="login.html">Sign In</a>
        </p>
      </section>
    </div>
  );
};
export default Register;
