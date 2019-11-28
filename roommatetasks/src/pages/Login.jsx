import React from "react";
import ReactDOM from "react-dom";
import RegisterUser from "./RegisterUser";
import axios from 'axios';
import md5 from 'md5';

const Login = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleLogin = () => {
    console.log("in handle login", email, password);

    const loginData = {
      email,
      password: md5(password)
    }

    axios
      .post("/login", {
        loginData
      })
      .then(function(response) {
        console.log("back to login",response);
      })
      .catch(function(error) {
        console.log(error);
      });

  };

  const handleRegister = () => {
    console.log("in register user");
    ReactDOM.render(<RegisterUser />, document.getElementById("show-register"));
  };

  return (
    <div>
      <div>
        <h3>Login to the Roommate Task Scheduling </h3>
      </div>
      <div>
        <span> Email </span>
        <input
          type="text"
          id="input-email"
          onChange={e => setEmail(e.target.value)}
        ></input>
      </div>
      <div>
        <span> Password </span>
        <input
          type="password"
          id="input-password"
          onChange={e => setPassword(e.target.value)}
        ></input>
      </div>
      <div>
        <button id="button-login" onClick={handleLogin}>
          Login
        </button>
      </div>
      <div>
        <button id="button-register" onClick={handleRegister}>
          Create a new account
        </button>
      </div>
      <div id="show-register"></div>
    </div>
  );
};

export default Login;
