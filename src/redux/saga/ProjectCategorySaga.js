import { call, put, takeLatest } from "redux-saga/effects";
import {
  GET_ALL_PROJECT_CATEGORY,
  GET_ALL_PROJECT_CATEGORY_SAGA,
  STATUS_CODE,
} from "../constants/CyberBugsConstants";
import { cyberBugsServices } from "../services/CyberBugsServices";

function* getAllProjectCategorySaga(action) {
  // console.log("actionSaga", action);

  try {
    // Goi API lay du lieu
    const { data, status } = yield call(() =>
      cyberBugsServices.getAllProjectCategory()
    );

    // Goi API thanh cong thi dispatch len reducer
    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: GET_ALL_PROJECT_CATEGORY,
        data: data.content,
      });
    }
  } catch (err) {
    console.log(err.response.data);
  }
}

export function* theoDoigetAllProjectCategory() {
  yield takeLatest(GET_ALL_PROJECT_CATEGORY_SAGA, getAllProjectCategorySaga);
}
