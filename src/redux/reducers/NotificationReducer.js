import { SHOW_NOTIFICATION } from "../constants/CyberBugsConstants";

const initialState = {
  message: "",
  description: "",
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SHOW_NOTIFICATION:
      {
        switch (action.typeNotification) {
          case "success": {
          }
          case "warning": {
          }
          case "info": {
          }
          case "error":
            {
            }
            notification[type]({
              message: "Notification Title",
              description: "This is the content of the notification.",
            });
        }
      }
      return { ...state };

    default:
      return state;
  }
};
