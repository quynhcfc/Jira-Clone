import axios from "axios";
import { DOMAIN, TOKEN } from "../constants/CyberBugsConstants";

export const cyberBugsServices = {
  signinCyberBugs: (userLogin) => {
    return axios({
      url: `${DOMAIN}/Users/signin`,
      method: "POST",
      data: userLogin,
    });
  },

  signupCyberbugs: (userRegister) => {
    return axios({
      url: `${DOMAIN}/Users/signup`,
      method: "POST",
      data: userRegister,
    });
  },

  getAllProjectCategory: () => {
    return axios({
      url: `${DOMAIN}/ProjectCategory`,
      method: "GET",
    });
  },

  createProject: (newProject) => {
    return axios({
      //
      url: `${DOMAIN}/Project/createProject`,
      method: "POST",
      data: newProject,
    });
  },
  createProjectAuthorization: (newProject) => {
    return axios({
      url: `${DOMAIN}/Project/createProjectAuthorize`,
      method: "POST",
      data: newProject,
      headers: { Authorization: "Bearer " + localStorage.getItem(TOKEN) },
    });
  },

  getListProject: () => {
    return axios({
      url: `${DOMAIN}/Project/getAllProject`,
      method: "GET",
      headers: { Authorization: "Bearer " + localStorage.getItem(TOKEN) },
    });
  },

  updateProject: (projectUpdate) => {
    return axios({
      url: `${DOMAIN}/Project/updateProject?projectId=${projectUpdate.id}`,
      method: "PUT",
      data: projectUpdate,
      headers: { Authorization: "Bearer " + localStorage.getItem(TOKEN) },
    });
  },
};
