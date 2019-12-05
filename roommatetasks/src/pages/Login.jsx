import React from "react";

const Login = () => {
  return (
    <div>
      <h1>Login</h1>
      <form>
        <div className="form-group">
          <label htmlFor="username">User className</label>
          <input id="username" type="text" className="form-control" />
        </div>
        <div className="form-group">
          <label htmlFor="pasword">Password</label>
          <input id="pasword" type="text" className="form-control" />
        </div>
      </form>
      <button className="btn btn-primary">Login</button>
    </div>
  );
};

export default Login;
