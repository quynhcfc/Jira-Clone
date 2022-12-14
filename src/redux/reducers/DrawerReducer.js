import React from "react";
import {
  CLOSE_DRAWER,
  OPEN_DRAWER,
  OPEN_FORM_CREATE_TASK,
  OPEN_FORM_EDIT_PROJECT,
  SET_SUBMIT_CREATE_TASK,
  SET_SUBMIT_EDIT_PROJECT,
} from "../constants/CyberBugsConstants";

const initialState = {
  visible: false,
  title: "",
  ComponentContentDrawer: <p>Drawer Content</p>,
  callBackSubmit: (propsValue) => {
    alert("Submit Success");
  },
};

export const drawerReducer = (state = initialState, action) => {
  switch (action.type) {
    case OPEN_DRAWER:
      return { ...state, visible: true };

    case CLOSE_DRAWER:
      return { ...state, visible: false };

    case OPEN_FORM_EDIT_PROJECT:
      return {
        ...state,
        visible: true,
        ComponentContentDrawer: action.Component,
        title: action.title,
      };

    case SET_SUBMIT_EDIT_PROJECT:
      state.callBackSubmit = action.submitFunction;
      return {
        ...state,
      };

    case OPEN_FORM_CREATE_TASK:
      return {
        ...state,
        visible: true,
        ComponentContentDrawer: action.Component,
        title: action.title,
      };

    case SET_SUBMIT_CREATE_TASK: {
      return { ...state, callBackSubmit: action.submitFunction };
    }

    default:
      return state;
  }
};
