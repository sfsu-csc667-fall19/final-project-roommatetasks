import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { authenticateCookies } from '../redux/actions/userActions';

//let sessionStatus = true;

/*function getCookie()
{
  let body = {
    cookies: document.cookie,
  }
  axios.get('/cookie',body)
    .then((res) => {
      console.log("before setting from getcookie")
      
      console.log("after setting from getcookie")
      sessionCookies = true
    })
    .catch(console.log);

  {!sessionCookies && (
        <div> <h2> trying to fetch cookies </h2><div><button yo={getCookie()}>Check if you have cookies</button></div></div>
      )}
      {sessionCookies && (
        <div> <h3>success</h3> </div>
      )}



}*/


const Dashboard = ({ dispatch, hasCookies, email, password }) => {
  //const getCookie = () => {
   // dispatch(authenticateCookies());
   //hasCookies = true;
    
 // };

  function setCookie (email, password) {
    var d = new Date();
    d.setTime(d.getTime() + (1*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = 'email=' + email + ';' + expires +';';
    document.cookie = 'password=' + password + ';' + expires +';';
    const body = {
      cookies: document.cookie,
    }
    axios.get('/cookie',body)
      .then((res) => {
        console.log("Hey")
        console.log(res)
      })
      .catch(console.log);
      
  };
  
  return (
    
    <div>
      <h2>Dashboard</h2>
      {hasCookies && (
      <div>Welcome {email} {setCookie(email,password)}
      </div>
      )}
      <div>{!hasCookies && (
       <div>Please login in order to view this page. </div> 
      )}</div> 
    
      

    </div>
    
  );
};


export default connect(state => ({
  email: state.userReducer.email,
  hasCookies: state.userReducer.hasCookies,
  password: state.userReducer.password,
}))(Dashboard);
