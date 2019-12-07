import React from "react";
import { connect } from "react-redux";
import axios from "axios";
import { setIsLoggedIn } from "../redux/actions/userActions";
import { Redirect } from 'react-router-dom';

const Dashboard = ({ dispatch, isLoggedIn }) => {
  React.useEffect(() => {
    console.log("in useeffect of dashboard isLoggedin", isLoggedIn);
    if (!isLoggedIn) {
      console.log("in if of dashboard, useeffect, isLoggedIn", isLoggedIn);
      let cookieData = document.cookie.split(';');
      let eqPos1 = cookieData[0].indexOf("=") + 1;
      let email = cookieData[0].substr(eqPos1,cookieData[0].length);

      let eqPos2 = cookieData[1].indexOf("=") + 1;
      let password = cookieData[1].substr(eqPos2,cookieData[1].length);
      
      const loginData = {
        email,
        password
      };

      console.log("logindata in dashboard", loginData);

      axios
        .post("/login", {
          loginData
        })
        .then(function(response) {
          console.log("back to dashboard", response);
          if (response.data.valid) {
            console.log("now try to redirect it to dashboard");
            dispatch(setIsLoggedIn(true));
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  });

  const handleLogout = () => {
    document.cookie = "email=";
    document.cookie = "password=";
    dispatch(setIsLoggedIn(false));
    console.log("isLoggedin in logout", isLoggedIn);
  };

  if(!isLoggedIn){
    return <Redirect to="/login" />
  }

  return (
    <div>
      <h2>This is Dashboard</h2>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

const mapStateToProps = state => ({
  isLoggedIn: state.userReducer.isLoggedIn
});

export default connect(mapStateToProps)(Dashboard);
