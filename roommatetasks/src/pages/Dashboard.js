import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';



function setCookie (email, password) {

  document.cookie = 'email=' + email;
  document.cookie = 'password=' + password;
  axios.post('/cookies/')
    .then((res) => {
      
      console.log(res)
    })
    .catch(console.log);
}




const Dashboard = ({ hasCookies, email, password }) => {
  return (
    
    <div>
      <h2>Dashboard</h2>
      {hasCookies && (
      <div>Welcome {email}
      <button onClick={setCookie(email,password)}>Get Data</button>
      </div>
      
      )}
      {!hasCookies && (
        <div> Please login to access this page </div>
      )}
    </div>
    
  );
};

export default connect(state => ({
  email: state.userReducer.email,
  hasCookies: state.userReducer.hasCookies,
  password: state.userReducer.password,
}))(Dashboard);
