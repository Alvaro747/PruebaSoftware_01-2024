import BaseApi from "@services/base/apiBase.service.js";

export default class UserService extends BaseApi {
  constructor(args) {
    super(args);

    this.serviceEndpoints = {
      baseUrl: import.meta.env.VITE_REACT_APP_BASE_API,
      get: "/identity/user/management/",
      create: "/identity/user/management/",
      update: "/identity/user/management/",
      delete: "/identity/user/management/",
    };
  }

  async get(data, parameters) {
    return super.getByParameters(data, parameters);
  }

  async update(data) {
    return super.update(data);
  }

  async create(data) {
    return super.create(data);
  }

  async delete(data) {
    return super.delete(data);
  }

}
