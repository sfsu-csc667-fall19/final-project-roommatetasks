import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { setEmail, setPassword, checkUserInBody, checkUser} from '../redux/actions/userActions';
import md5 from 'md5'

const Login = ({ dispatch, email, password, isLoggedIn }) => {
  //const [email, setEmail] = React.useState('');
  //const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  const verify = () => {
  //  dispatch(checkUser(email, md5(password)))
    dispatch(checkUserInBody(email, md5(password)))
  };

  const updateEmail = (newEmail) => {
    if (newEmail.length < 20) {
      dispatch(setEmail(newEmail));
    }
  };

  const updatePassword = (newPassword) => {
    if (newPassword.length < 20) {
        dispatch(setPassword(newPassword))
        return true;
    }
}



  if (isLoggedIn) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <div>
      <h2>Login</h2>
      <div>
      
       
      <div>
          <input
            name="email"
            
            value={email}
            placeholder="username"
            onChange={e => updateEmail(e.target.value)}

            
          />
          </div>
          <div>
          <input
            name="password"
            type="password"
            value={password}
            placeholder="password"
            onChange={e => updatePassword(e.target.value)}
            
          />
        </div>
        <div>
          <button onClick={verify}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  email: state.userReducer.email,
  password: state.userReducer.password,
  isLoggedIn: state.userReducer.isLoggedIn,
});

export default connect(mapStateToProps)(Login);