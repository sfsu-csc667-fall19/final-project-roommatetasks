import React from "react";
import "./registeruser.css";
import axios from "axios";
import md5 from "md5";
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form'

const RegisterUser = () => {
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleRegister = () => {
    console.log("in handle register", firstName, lastName, email, password);

    const userData = {
      firstName,
      lastName,
      email,
      password: md5(password)
    };

    axios
      .post("/registeruser", {
        userData
      })
      .then(function(response) {
        console.log(response);
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  return (
    <div className='margin-from-top'>
      <h3>Sign Up Here!</h3>
      <Form as={Col} column md={6} style={{ textAlign: 'left' }}>
      <Form.Group>
          <Form.Label>First Name</Form.Label>
            <Form.Control onChange={e => setFirstName(e.target.value)} required></Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label>Last Name</Form.Label>
            <Form.Control onChange={e => setLastName(e.target.value)} required></Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label>Email address</Form.Label>
            <Form.Control onChange={e => setEmail(e.target.value)} type="email"
              placeholder="Enter email" required></Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label>Password</Form.Label>
            <Form.Control onChange={e => setPassword(e.target.value)} type="password" placeholder="Password" required></Form.Control>
        </Form.Group>
        <Button onClick={handleRegister} variant="primary">
          Log In
        </Button>
      </Form>
    </div>
  );
};

export default RegisterUser;
