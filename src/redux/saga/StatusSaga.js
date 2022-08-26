import { call, put, takeLatest } from "redux-saga/effects";
import {
  GET_ALL_STATUS,
  GET_ALL_STATUS_SAGA,
} from "../constants/CyberBugsConstants";
import { statusService } from "../services/StatusService";

function* getAllStatus(action) {
  try {
    const { data, status } = yield call(() => statusService.getAllStatus());

    yield put({
      type: GET_ALL_STATUS,
      arrStatus: data.content,
    });
  } catch (err) {
    console.log(err);
  }
}

export function* theoDoiGetAllStatusSaga() {
  yield takeLatest(GET_ALL_STATUS_SAGA, getAllStatus);
}
