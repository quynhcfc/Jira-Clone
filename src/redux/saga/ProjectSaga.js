import { call, put, takeLatest, delay } from "redux-saga/effects";
import {
  CLOSE_DRAWER,
  CREATE_PROJECT,
  CREATE_PROJECT_SAGA,
  DELETE_PROJECT_SAGA,
  DETAIL_PROJECT_SAGA,
  DISPLAY_LOADING,
  GET_ALL_PROJECT,
  GET_ALL_PROJECT_SAGA,
  GET_LIST_PROJECT,
  GET_LIST_PROJECT_SAGA,
  GET_USER_BY_PROJECT_ID_SAGA,
  HIDE_LOADING,
  PUT_PROJECT_DETAIL,
  STATUS_CODE,
  UPDATE_PROJECT_SAGA,
} from "../constants/CyberBugsConstants";
import { cyberBugsServices } from "../services/CyberBugsServices";
import { history } from "../../libs/History";
import { projectService } from "../services/ProjectService";
import { openNotificationWithIcon } from "../../util/Notification";

// Start Create Project
function* createProjectSaga(action) {
  try {
    // Goi API lay du lieu
    const { data, status } = yield call(() =>
      cyberBugsServices.createProjectAuthorization(action.newProject)
    );

    // Goi API thanh cong thi dispatch len reducer
    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: CREATE_PROJECT,
        data: data.content,
      });
      yield put({
        type: DISPLAY_LOADING,
      });
      yield delay(1000);

      openNotificationWithIcon("success", "Create project successfylly!");

      history.push("/projectmanagement");
    }
  } catch (err) {
    console.log(err.response.data);
    openNotificationWithIcon("error", "Create project fail!");
  }
  yield put({
    type: HIDE_LOADING,
  });
}

export function* theoDoiCreateProjectSaga() {
  yield takeLatest(CREATE_PROJECT_SAGA, createProjectSaga);
}
// End Create Project

// Start Get List Project
function* getListProjectSaga(action) {
  try {
    const { data, status } = yield call(() =>
      cyberBugsServices.getListProject()
    );
    // Sau khi goi du lieu tu API ve thanh cong
    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: GET_LIST_PROJECT,
        projectList: data.content,
      });
    }
  } catch (err) {
    console.log(err.response.data);
  }
}

export function* theoDoiGetListProjectSaga() {
  yield takeLatest(GET_LIST_PROJECT_SAGA, getListProjectSaga);
}
// End Get List Project

// Start Update project
function* updateProjectSaga(action) {
  try {
    const { data, status } = yield call(() =>
      cyberBugsServices.updateProject(action.projectUpdate)
    );
    // Sau khi goi du lieu tu API ve thanh cong
    if (status === STATUS_CODE.SUCCESS) {
      console.log("data", data);

      yield put({
        type: GET_LIST_PROJECT_SAGA,
      });

      yield put({
        type: DISPLAY_LOADING,
      });
      yield delay(1000);

      openNotificationWithIcon("success", "Fix project successfylly!");

      yield put({
        type: CLOSE_DRAWER,
      });
    }
  } catch (err) {
    console.log(err.response.data);
    openNotificationWithIcon("error", "Fix project fail!");
  }
  yield put({ type: HIDE_LOADING });
}

export function* theoDoiUpdateProjectSaga() {
  yield takeLatest(UPDATE_PROJECT_SAGA, updateProjectSaga);
}
// End Update Project

// Start Delete Project
function* deleteProjectSaga(action) {
  try {
    const { data, status } = yield call(() =>
      projectService.deleteProject(action.idProject)
    );
    // Sau khi goi du lieu tu API ve thanh cong
    if (status === STATUS_CODE.SUCCESS) {
      openNotificationWithIcon("success", "Delete project successfylly!");
    }

    yield call(getListProjectSaga);

    yield put({
      type: CLOSE_DRAWER,
    });
  } catch (err) {
    openNotificationWithIcon("error", "Delete project fail!");
    console.log(err.response.data);
  }
}

export function* theoDoiDeleteProjectSaga() {
  yield takeLatest(DELETE_PROJECT_SAGA, deleteProjectSaga);
}
// End Delete Project

// Start Get Project Detail
function* detailProjectSaga(action) {
  try {
    const { data, status } = yield call(() =>
      projectService.getProjectDetail(action.projectId)
    );

    yield put({
      type: PUT_PROJECT_DETAIL,
      projectDetail: data.content,
    });
  } catch (err) {
    console.log(err.response.data);
    history.push("/cyberbugs");
  }
}

export function* theoDoiDetailProjectSaga() {
  yield takeLatest(DETAIL_PROJECT_SAGA, detailProjectSaga);
}
// End Get Project Detail

// Start Get All Project
function* getAllProjectSaga(action) {
  try {
    const { data, status } = yield call(() => projectService.getAllProject());

    yield put({
      type: GET_ALL_PROJECT,
      arrProject: data.content,
    });

    yield put({
      type: GET_USER_BY_PROJECT_ID_SAGA,
      idProject: data.content[0]?.id,
    });
  } catch (err) {
    console.log(err.response.data);
    history.push("/projectmanagement");
  }
}

export function* theoDoiGetAllProjectSaga() {
  yield takeLatest(GET_ALL_PROJECT_SAGA, getAllProjectSaga);
}
// End Get All Project
