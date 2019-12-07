import axios from "axios";

export const setEmail = email => ({ // 1 param = no parentheses
  type: 'SET_EMAIL',
  email,
  // email: email,
});

export const setIsLoggedIn = isLoggedIn => ({
  type: 'SET_IS_LOGGED_IN',
  isLoggedIn,
});

export const setPassword = password => ({
  type: 'SET_PASSWORD',
  password,
})

export const setRPassword = rpassword => ({
  type: 'SET_RPASSWORD',
  rpassword,
})

export const setIsRegister = isRegister => ({
  type: 'SET_IS_REGISTER',
  isRegister,
});

export const yesCookies = hasCookies => ({
  type: 'HAS_COOKIES',
  hasCookies,
});

export const noCookies = hasCookies => ({
  type: 'NO_COOKIES',
  hasCookies,
});

//pass 2 parameters email and password to create new user
export const addUser = (email, rpassword) => (dispatch, getState) => {
  //const {email, password} = getState().userReducer;
  //post request to routes using query on url
  const body = {
    email: email,
    password: rpassword
  }
  console.log("ok")
  axios.post('/users', body)
    .then(res => dispatch({
      type: 'REGISTER_SUCCESS',
      payload: res.data
    }))
    .catch(err => {
      dispatch({
        type: 'REGISTER_FAIL'
      })
    });
};

export const checkUser = (email, password) => (dispatch, getState) => {
  //const {email, password} = getState().userReducer;
  //post request to routes using query on addurl
  axios.post(`/auth?email=${email}&password=${password}`)
    .then(res => dispatch({
      type: 'LOGIN_SUCCESS',
      payload: res.data
    }))
    .catch(err => {
      dispatch({
        type: 'LOGIN_FAIL'
      })
    });
};

export const authenticateCookies = (hasCookies) => (dispatch, getState) => {
  const body = {
    email: document.cookie.email,
    password: document.cookie.password,
    cookies: document.cookie
  };
  axios.get('/cookie',body)
  .then((res) => 
  {
    if (res.data.valid){
      console.log("suxxezz")
   dispatch({
    type: 'HAS_COOKIES'
  })
}
  })
  .catch(err => {
    console.log("fug")
    dispatch({
      type: 'NO_COOKIES'
    })
  });
 
};

export const checkUserInBody = (email, password) => (dispatch, getState) => {
  /*const options = {
    withCredentials: true
  };*/
  const body = {
    email: email, 
    password: password, 
  };
  //post request to routes using query on url
  axios.post('/auth', body)
    .then((res) => {
      //valid key is true => user is able to login
      if (res.data.valid) {
        dispatch({
          type: 'LOGIN_SUCCESS',
          payload: res.data
        })
      }
    } 
    )
    .catch(err => {
      dispatch({
        type: 'LOGIN_FAIL'
      })
    });
};
