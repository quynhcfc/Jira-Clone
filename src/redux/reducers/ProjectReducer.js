import {
  EDIT_PROJECT,
  PUT_PROJECT_DETAIL,
} from "../constants/CyberBugsConstants";

const initialState = {
  projectEdit: {
    id: 0,
    projectName: "string",
    creator: 0,
    description: "string",
    categoryId: 0,
  },
  projectDetail: {
    //
  },
};

export const ProjectReducer = (state = initialState, action) => {
  switch (action.type) {
    case EDIT_PROJECT: {
      state.projectEdit = action.projectEditModal;
      return { ...state };
    }

    case PUT_PROJECT_DETAIL: {
      state.projectDetail = action.projectDetail;
      return { ...state };
    }

    default:
      return state;
  }
};
