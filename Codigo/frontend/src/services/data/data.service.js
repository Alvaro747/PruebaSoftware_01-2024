import BaseApi from "@services/base/apiBase.service.js";

export default class DataService extends BaseApi {
  constructor(args) {
    super(args);

    this.serviceEndpoints = {
      baseUrl: import.meta.env.VITE_REACT_APP_BASE_API,
      get: "/data",
      create: "/data",
    };
  }

  async get(data, parameters) {
    return super.get(data, parameters);
  }

  async create(data) {
    return super.create(data);
  }
}
