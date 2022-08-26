import {
  GET_ALL_PROJECT,
  GET_LIST_PROJECT,
} from "../constants/CyberBugsConstants";

const stateDefault = {
  projectList: [],

  // Get all project for dropdow in create task
  arrProject: [],
};

export const ProjectManagementReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case GET_LIST_PROJECT:
      state.projectList = action.projectList;
      return { ...state };

    case GET_ALL_PROJECT:
      state.arrProject = action.arrProject;
      return { ...state };

    default:
      return { ...state };
  }
};
