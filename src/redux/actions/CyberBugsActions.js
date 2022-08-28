import {
  ADMIN_LOGIN_API,
  USER_SIGNIN_API,
} from "../constants/CyberBugsConstants";

export const signinCyberBugsAction = (email, password) => {
  return {
    type: USER_SIGNIN_API,
    userLogin: {
      email: email,
      password: password,
    },
  };
};

export const singnAdminCyberBugsAction = (email, password) => {
  return {
    type: ADMIN_LOGIN_API,
    adminLogin: {
      email: email,
      password: password,
    },
  };
};
