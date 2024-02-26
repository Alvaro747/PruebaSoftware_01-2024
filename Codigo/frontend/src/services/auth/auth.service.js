import BaseApi from "@services/base/apiBase.service.js";

export default class AuthService extends BaseApi {
  constructor(args) {
    super(args);

    this.serviceEndpoints = {
      baseUrl: import.meta.env.VITE_REACT_APP_BASE_API,
      post: "/auth/login",
      create: "/auth/register",
    };
  }

  async post(data) {
    return super.post(data);
  }

  async create(data) {
    return super.create(data);
  }
}
