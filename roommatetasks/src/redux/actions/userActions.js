export const setEmail = email => ({
  // 1 param = no parentheses
  type: "SET_EMAIL",
  email
});

export const setIsLoggedIn = isLoggedIn => ({
  type: "SET_IS_LOGGED_IN",
  isLoggedIn
});

export const setActiveUsers = activeUsers => ({
  type: "SET_ACTIVE_USERS",
  activeUsers
});
