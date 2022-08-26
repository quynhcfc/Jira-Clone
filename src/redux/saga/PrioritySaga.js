import { call, put, takeLatest } from "redux-saga/effects";
import {
  GET_PRIORITY,
  GET_PRIORITY_SAGA,
} from "../constants/CyberBugsConstants";
import { priorityService } from "../services/PriorityService";

function* getAllPriority(action) {
  try {
    const { data, status } = yield call(() => priorityService.getAllPriority());

    yield put({
      type: GET_PRIORITY,
      arrPriority: data.content,
    });
  } catch (err) {
    console.log(err);
  }
}

export function* theoDoiGetAllPrioritySaga() {
  yield takeLatest(GET_PRIORITY_SAGA, getAllPriority);
}
