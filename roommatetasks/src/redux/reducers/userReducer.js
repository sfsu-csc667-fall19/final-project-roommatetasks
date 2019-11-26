const INITIAL_STATE = {
  email: "temp",
  isLoggedIn: false
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "SET_IS_LOGGED_IN":
      return {
        ...state,
        isLoggedIn: action.isLoggedIn
      };
    case "SET_EMAIL":
      return {
        ...state,
        email: action.email
      };
    default:
      return state;
  }
};

export default userReducer;
