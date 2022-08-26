import { call, put, takeLatest, delay } from "redux-saga/effects";
import { taskService } from "../services/TaskService";
import { openNotificationWithIcon } from "../../util/Notification";
import {
  CLOSE_DRAWER,
  CREATE_TASK_SAGA,
  DISPLAY_LOADING,
  HIDE_LOADING,
  STATUS_CODE,
} from "../constants/CyberBugsConstants";

function* createTaskSaga(action) {
  try {
    //
    const { data, status } = yield call(() =>
      taskService.createTask(action.taskObject)
    );

    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: DISPLAY_LOADING,
      });
      yield delay(1000);

      openNotificationWithIcon("success", "Create task successfylly!");

      yield put({
        type: CLOSE_DRAWER,
      });
    }
    //
  } catch (err) {
    console.log(err.response.data);
    openNotificationWithIcon("error", "Create task fail!");
  }
  yield put({
    type: HIDE_LOADING,
  });
}

export function* theoDoiCreateTaskSaga() {
  yield takeLatest(CREATE_TASK_SAGA, createTaskSaga);
}
