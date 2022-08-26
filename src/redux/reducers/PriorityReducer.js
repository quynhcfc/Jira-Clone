import { GET_PRIORITY } from "../constants/CyberBugsConstants";

const initialState = {
  arrPriority: [],
};

export const PriorityReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PRIORITY:
      state.arrPriority = action.arrPriority;
      return { ...state };

    default:
      return state;
  }
};
