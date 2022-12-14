import { call, put, takeLatest } from "redux-saga/effects";
import {
  GET_ALL_TASK_TYPE,
  GET_ALL_TASK_TYPE_SAGA,
} from "../constants/CyberBugsConstants";
import { taskTypeService } from "../services/TaskTypeService";

function* getAllTaskType(action) {
  try {
    const { data, status } = yield call(() => taskTypeService.getAllTaskType());

    yield put({
      type: GET_ALL_TASK_TYPE,
      arrTaskType: data.content,
    });
  } catch (err) {
    console.log(err);
  }
}

export function* theoDoiGetAllTaskTypeSaga() {
  yield takeLatest(GET_ALL_TASK_TYPE_SAGA, getAllTaskType);
}
