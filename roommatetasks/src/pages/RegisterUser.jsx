import React from "react";
import "./registeruser.css";
import axios from "axios";
import md5 from "md5";

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
    <div>
      <div className="container">
        <table>
          <tr>
            <th> First Name</th>
            <td>
              <input onChange={e => setFirstName(e.target.value)} />
            </td>
          </tr>
          <tr>
            <th> Last Name</th>
            <td>
              <input onChange={e => setLastName(e.target.value)} />
            </td>
          </tr>
          <tr>
            <th> Email</th>
            <td>
              <input onChange={e => setEmail(e.target.value)} />
            </td>
          </tr>
          <tr>
            <th> Password </th>
            <td>
              <input type="password" onChange={e => setPassword(e.target.value)} />
            </td>
          </tr>
        </table>
      </div>
      <div>
        <button onClick={handleRegister}> Register </button>
      </div>
    </div>
  );
};

export default RegisterUser;
