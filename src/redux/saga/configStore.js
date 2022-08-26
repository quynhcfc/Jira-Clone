import { applyMiddleware, combineReducers, createStore } from "redux";
import reduxThunk from "redux-thunk";

// middleware saga
import createMiddleWareSaga from "redux-saga";
import { rootSaga } from "./rootSaga";
import { ProjectCategoryReducer } from "../reducers/ProjectCategoryReducer";
import { ProjectManagementReducer } from "../reducers/ProjectManagementReducer";
import { drawerReducer } from "../reducers/DrawerReducer";
import { ProjectReducer } from "../reducers/ProjectReducer";
import { UserReducer } from "../reducers/UserReducer";
import { TaskTypeReducer } from "../reducers/TaskTypeReducer";
import { PriorityReducer } from "../reducers/PriorityReducer";
import { StatusReducer } from "../reducers/StatusReducer";
import { TaskDetailModalReducer } from "../reducers/TaskDetailModalReducer";
import { LoadingReducer } from "../reducers/LoadingReducer";

const middleWareSaga = createMiddleWareSaga();

const rootReducer = combineReducers({
  //
  LoadingReducer,
  ProjectCategoryReducer,
  ProjectManagementReducer,
  drawerReducer,
  ProjectReducer,
  UserReducer,
  TaskTypeReducer,
  PriorityReducer,
  StatusReducer,
  TaskDetailModalReducer,
});

export const store = createStore(
  rootReducer,
  applyMiddleware(reduxThunk, middleWareSaga)
);

// call saga
middleWareSaga.run(rootSaga);
