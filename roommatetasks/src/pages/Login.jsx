import React from "react";
import ReactDOM from "react-dom";
import RegisterUser from "./RegisterUser";
import axios from "axios";
import md5 from "md5";
import {setIsLoggedIn} from '../redux/actions/userActions';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

const Login = ({dispatch, isLoggedIn}) => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleLogin = () => {
    console.log("in handle login", email, password);

    const loginData = {
      email,
      password: md5(password)
    };

    axios
      .post("/login", {
        loginData
      })
      .then(function(response) {
        console.log("back to login", response);
        if (response.data.valid) {
          console.log("we can set cookies here");
          document.cookie = `email=${email}`; 
          document.cookie = `password=${md5(password)}`;
          dispatch(setIsLoggedIn(true));
        }
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  if (isLoggedIn) {
    return <Redirect to="/dashboard"/>;
  }

  const handleRegister = () => {
    console.log("in register user");
    ReactDOM.render(<RegisterUser />, document.getElementById("show-register"));
  };

  return (
    <div>
      <div>
        <h3>Login to the Roommate Task Scheduling </h3>
      </div>
      <div className="container">
        <table>
          <tr>
            <th> Email </th>
            <td>
              <input onChange={e => setEmail(e.target.value)} />
            </td>
          </tr>
          <tr>
            <th> Password </th>
            <td>
              <input onChange={e => setPassword(e.target.value)} type="password"/>
            </td>
          </tr>
        </table>
      </div>

      <div>
        <button id="button-login" onClick={handleLogin}>
          Login
        </button>
      </div>
      {/* <div>
        <button id="button-register" onClick={handleRegister}>
          Create a new account
        </button>
      </div> */}
      <div id="show-register"></div>
    </div>
  );
};

const mapStateToProps = state => ({
  isLoggedIn: state.userReducer.isLoggedIn,
});

export default connect(mapStateToProps)(Login);
