import { call, takeLatest, put, delay } from "redux-saga/effects";
import { history } from "../../libs/History";
import {
  ADD_USER_PROJECT_API,
  ADLOGIN,
  ADMIN_LOGIN,
  ADMIN_LOGIN_API,
  DISPLAY_LOADING,
  GET_LIST_PROJECT_SAGA,
  GET_LIST_USER,
  GET_LIST_USER_SAGA,
  GET_USER_BY_PROJECT_ID,
  GET_USER_BY_PROJECT_ID_SAGA,
  GET_USER_SEARCH,
  GET_USER_SEARCH_API,
  HIDE_LOADING,
  REMOVE_USER_PROJECT_API,
  STATUS_CODE,
  TOKEN,
  USER_LOGIN,
  USER_SIGNIN_API,
  USER_SIGNUP,
  USER_SIGNUP_SAGA,
  USLOGIN,
} from "../constants/CyberBugsConstants";
import { cyberBugsServices } from "../services/CyberBugsServices";
import { userService } from "../services/UserService";
import { openNotificationWithIcon } from "../../util/Notification";
// import { delay } from "lodash";

// Start Login saga
function* signinSaga(action) {
  try {
    const { data } = yield call(() =>
      cyberBugsServices.signinCyberBugs(action.userLogin)
    );

    yield put({
      type: USLOGIN,
      userLogin: data.content,
    });

    yield put({
      type: DISPLAY_LOADING,
    });

    yield delay(800);

    // Lưu localStorage khi đăng nhập thành công
    localStorage.setItem(TOKEN, data.content.accessToken);
    localStorage.setItem(USER_LOGIN, JSON.stringify(data.content));

    history.push("/projectmanagement");
  } catch (err) {
    console.log(err.response.data);
  }

  yield put({
    type: HIDE_LOADING,
  });
}

export function* theoDoiSignin() {
  yield takeLatest(USER_SIGNIN_API, signinSaga);
}
// End Login saga

// Start Register saga
function* signupSaga(action) {
  try {
    const { data, status } = yield call(() =>
      cyberBugsServices.signupCyberbugs(action.userRegister)
    );

    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: USER_SIGNUP,
      });

      yield put({
        type: DISPLAY_LOADING,
      });
      yield delay(1000);

      openNotificationWithIcon("success", "Register successfylly!");
      //
    } else {
      yield put({
        type: HIDE_LOADING,
      });
      openNotificationWithIcon("error", "Register fail!");
    }

    history.push("/");
  } catch (err) {
    console.log(err.response.data);
  }

  yield put({
    type: HIDE_LOADING,
  });
}

export function* theoDoiSignup() {
  yield takeLatest(USER_SIGNUP_SAGA, signupSaga);
}
// End Register saga

// Start Search User for Project Saga
function* getUserSaga(action) {
  try {
    const { data, status } = yield call(() =>
      userService.getUser(action.keyWord)
    );

    yield put({
      type: GET_USER_SEARCH,
      listUserSearch: data.content,
    });
  } catch (err) {
    console.log(err.response.data);
  }
}

export function* theoDoiGetUser() {
  yield takeLatest(GET_USER_SEARCH_API, getUserSaga);
}
// End Search User for Project saga

// Start Add User for Project Saga
function* addUserProjectSaga(action) {
  try {
    const { data, status } = yield call(() =>
      userService.assignUserProject(action.userProject)
    );

    yield put({
      type: GET_LIST_PROJECT_SAGA,
    });
  } catch (err) {
    console.log(err.response.data);
  }
}

export function* theoDoiAddUserProject() {
  yield takeLatest(ADD_USER_PROJECT_API, addUserProjectSaga);
}
// End Add User for Project saga

// Start Remove User for Project Saga
function* removeUserProjectSaga(action) {
  try {
    const { data, status } = yield call(() =>
      userService.removeUserProject(action.userProject)
    );

    yield put({
      type: GET_LIST_PROJECT_SAGA,
    });
  } catch (err) {
    console.log(err.response.data);
  }
}

export function* theoDoiRemoveUserProject() {
  yield takeLatest(REMOVE_USER_PROJECT_API, removeUserProjectSaga);
}
// End Remove User for Project saga

// Start load User of Project
function* getUserByProjectIdSaga(action) {
  const { idProject } = action;
  try {
    //
    const { data, status } = yield call(() =>
      userService.getUserByProjectId(idProject)
    );

    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: GET_USER_BY_PROJECT_ID,
        userProject: data.content,
      });
    }
  } catch (err) {
    console.log(err);
    if (err.response?.data.statusCode === STATUS_CODE.NOT_FOUND) {
      yield put({
        type: GET_USER_BY_PROJECT_ID,
        userProject: [],
      });
    }
  }
}

export function* theoDoiGetUserByProjectIdSaga() {
  yield takeLatest(GET_USER_BY_PROJECT_ID_SAGA, getUserByProjectIdSaga);
}
// End load User of Project

// Start Login Admin Saga
function* signinAdminSaga(action) {
  try {
    const { data } = yield call(() =>
      cyberBugsServices.signinAdminCyberBugs(action.adminLogin)
    );

    yield put({
      type: ADLOGIN,
      adminLogin: data.content,
    });

    yield put({
      type: DISPLAY_LOADING,
    });

    yield delay(800);

    // Lưu localStorage khi đăng nhập thành công
    localStorage.setItem(TOKEN, data.content.accessToken);
    localStorage.setItem(ADMIN_LOGIN, JSON.stringify(data.content));

    history.push("/listuser");
  } catch (err) {
    console.log(err.response.data);
  }

  yield put({
    type: HIDE_LOADING,
  });
}

export function* theoDoiAdminSigninSaga() {
  yield takeLatest(ADMIN_LOGIN_API, signinAdminSaga);
}
// End Login Admin Saga

// Start Get List User Saga
function* getListUserSaga(action) {
  try {
    const { data, status } = yield call(() => userService.getUserAdmin());

    yield put({
      type: GET_LIST_USER,
      listUser: data.content,
    });
  } catch (err) {
    console.log(err.response.data);
  }
}

export function* theoDoiGetListUser() {
  yield takeLatest(GET_LIST_USER_SAGA, getListUserSaga);
}
// End Get List User Saga
