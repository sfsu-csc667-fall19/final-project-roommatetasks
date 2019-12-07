// Creating a reducer

// Step 1 initialize state
const INITIAL_STATE = {
  email: '',
  password: '',
  rpassword: '',
  isRegister: false,
  isLoggedIn: false,
  hasCookies: false,
};

// Step 2 create listener function
const userReducer = (state = INITIAL_STATE, action) => {
  // Step 3 create switch for action types
  switch (action.type) {
    case 'SET_IS_LOGGED_IN':
      return {
        ...state,
        isLoggedIn: action.isLoggedIn,
      };
    case 'SET_EMAIL':
      return {
        ...state, // spread operator
        // email: state.email,
        // isLoggedIn: state.isLoggedIn,
        email: action.email,
      };

    case 'SET_PASSWORD':
      return {
        ...state,
        password: action.password,
      }
    case 'SET_RPASSWORD':
      return {
        ...state,
        rpassword: action.rpassword,
      }
    case 'SET_IS_REGISTER':
      return {
        ...state,
        isRegister: action.isRegister,
      }
    case 'REGISTER_SUCCESS':
      return {
        ...state,
        //...action.payload,
        isLoggedIn: false,
        isRegister: true,
      }
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        ...action.payload,
        isLoggedIn: true,
        isRegister: true,
        hasCookies: true,
      }
    case 'LOGIN_FAIL':
    case 'REGISTER_FAIL':
      return {
        ...state,
        isLoggedIn: false,
        isRegister: false,
      }
    
    case 'HAS_COOKIES':
      return {
        ...state,
        hasCookies: true,
      }

    case 'NO_COOKIES':
      return {
        ...state,
        hasCookies: false,
      }

    
    default:
      return state;
  }
};

// don't forget to export
export default userReducer;
