import React from "react";
import ReactDOM from "react-dom";
import RegisterUser from "./RegisterUser";
import axios from "axios";
import md5 from "md5";
import { setIsLoggedIn } from '../redux/actions/userActions';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form'

const Login = ({ dispatch, isLoggedIn }) => {
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
      .then(function (response) {
        console.log("back to login", response);
        if (response.data.valid) {
          console.log("we can set cookies here");
          document.cookie = `email=${email}`;
          document.cookie = `password=${md5(password)}`;
          dispatch(setIsLoggedIn(true));
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  if (isLoggedIn) {
    return <Redirect to="/dashboard" />;
  }

  const handleRegister = () => {
    console.log("in register user");
    ReactDOM.render(<RegisterUser />, document.getElementById("show-register"));
  };

  return (
    <div className='margin-from-top'>
      <h3>Login to the Roommate Task Scheduling </h3>
      <Form as={Col} column md={{ span: 6, offset: 3 }} style={{ textAlign: 'left' }}>
        <Form.Group>
          <Form.Label>Email address</Form.Label>
            <Form.Control onChange={e => setEmail(e.target.value)} type="email"
              placeholder="Enter email" required></Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label>Password</Form.Label>
            <Form.Control onChange={e => setPassword(e.target.value)} type="password" placeholder="Password" required></Form.Control>
        </Form.Group>
        <Button onClick={handleLogin} variant="primary">
          Log In
        </Button>
      </Form>
    </div>
  );
};

const mapStateToProps = state => ({
  isLoggedIn: state.userReducer.isLoggedIn,
});

export default connect(mapStateToProps)(Login);