import axios from "axios";
import { DOMAIN, TOKEN } from "../constants/CyberBugsConstants";

export class BaseService {
  put = (url, data) => {
    return axios({
      //
      url: `${DOMAIN}/${url}`,
      method: "PUT",
      data: data,
      headers: { Authorization: "Bearer " + localStorage.getItem(TOKEN) },
    });
  };

  post = (url, data) => {
    return axios({
      url: `${DOMAIN}/${url}`,
      method: "POST",
      data: data,
      headers: { Authorization: "Bearer " + localStorage.getItem(TOKEN) },
    });
  };

  get = (url) => {
    return axios({
      url: `${DOMAIN}/${url}`,
      method: "GET",
      headers: { Authorization: "Bearer " + localStorage.getItem(TOKEN) },
    });
  };

  delete = (url) => {
    return axios({
      url: `${DOMAIN}/${url}`,
      method: "DELETE",
      headers: { Authorization: "Bearer " + localStorage.getItem(TOKEN) },
    });
  };
}
