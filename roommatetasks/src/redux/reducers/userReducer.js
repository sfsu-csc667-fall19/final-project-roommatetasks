const INITIAL_STATE = {
  email: "",
  isLoggedIn: false,
  activeUsers: 0
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
    case "SET_ACTIVE_USERS":
      return {
        ...state,
        activeUsers: action.activeUsers
      };
    default:
      return state;
  }
};

export default userReducer;
