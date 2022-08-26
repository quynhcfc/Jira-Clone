import { all } from "redux-saga/effects";
import * as Cyberbugs from "./UserCyberBugsSaga";
import * as ProjectCategorySaga from "./ProjectCategorySaga";
import * as ProjectSaga from "./ProjectSaga";
import * as TaskTypeSaga from "./TaskTypeSaga";
import * as ProritySaga from "./PrioritySaga";
import * as TaskSaga from "./TaskSaga";
import * as StatusSaga from "./StatusSaga";

export function* rootSaga() {
  yield all([
    Cyberbugs.theoDoiSignin(),
    Cyberbugs.theoDoiSignup(),
    Cyberbugs.theoDoiGetUser(),
    Cyberbugs.theoDoiAddUserProject(),
    Cyberbugs.theoDoiRemoveUserProject(),
    Cyberbugs.theoDoiGetUserByProjectIdSaga(),
    ProjectSaga.theoDoiDetailProjectSaga(),
    ProjectSaga.theoDoiCreateProjectSaga(),
    ProjectSaga.theoDoiGetListProjectSaga(),
    ProjectSaga.theoDoiUpdateProjectSaga(),
    ProjectSaga.theoDoiDeleteProjectSaga(),
    ProjectSaga.theoDoiGetAllProjectSaga(),
    ProjectCategorySaga.theoDoigetAllProjectCategory(),
    TaskTypeSaga.theoDoiGetAllTaskTypeSaga(),
    ProritySaga.theoDoiGetAllPrioritySaga(),
    TaskSaga.theoDoiCreateTaskSaga(),
    StatusSaga.theoDoiGetAllStatusSaga(),
  ]);
}
