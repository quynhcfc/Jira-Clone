import {
  GET_USER_BY_PROJECT_ID,
  GET_USER_SEARCH,
  USER_LOGIN,
  USER_SIGNUP,
  USLOGIN,
} from "../constants/CyberBugsConstants";

let usLogin = {};

if (localStorage.getItem(USER_LOGIN)) {
  usLogin = JSON.parse(localStorage.getItem(USER_LOGIN));
}

const stateDefault = {
  userLogin: usLogin,
  userSearch: [],
  userProject: [],
  userRegister: {
    //
  },
};

export const UserReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case USLOGIN: {
      state.userLogin = action.userLogin;
      return { ...state };
    }

    case GET_USER_SEARCH: {
      state.userSearch = action.listUserSearch;
      return { ...state };
    }

    case GET_USER_BY_PROJECT_ID: {
      return { ...state, userProject: action.userProject };
    }

    case USER_SIGNUP: {
      return { ...state, userRegister: action.userRegister };
    }
    default:
      return { ...state };
  }
};
