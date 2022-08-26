import { BaseService } from "./BaseService";

export class UserService extends BaseService {
  constructor() {
    super();
  }

  getUser = (keyWord) => {
    return this.get(`/Users/getUser?keyWord=${keyWord}`);
  };

  assignUserProject = (userProject) => {
    return this.post(`/Project/assignUserProject`, userProject);
  };

  removeUserProject = (userProject) => {
    return this.post(`/Project/removeUserFromProject`, userProject);
  };

  getUserByProjectId = (idProject) => {
    return this.get(`Users/getUserByProjectId?idProject=${idProject}`);
  };
}

export const userService = new UserService();
