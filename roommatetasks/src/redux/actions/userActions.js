export const setEmail = email => ({ // 1 param = no parentheses
    type: 'SET_EMAIL',
    email,
  });
  
  export const setIsLoggedIn = isLoggedIn => ({
    type: 'SET_IS_LOGGED_IN',
    isLoggedIn,
  });
