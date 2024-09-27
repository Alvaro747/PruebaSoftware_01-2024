export default class BaseApi {
  constructor() {
    // get token from local storage to use in the api requests
    this.api_token = localStorage.getItem("user").accessTocken || null;

    // here you can set the base url for the api used in the service entity
    this.serviceEndpoints = {
      // this is the base url for the api (base url from backend)
      baseUrl: "",
      get: "",
      create: "",
      post: "",
      update: "",
      delete: "",
      patch: "",
      put: "",
    };
  }

  // this method is used to get data from the api
  async get(data, parameters) {
    try {
      if (!data) {
        return null;
      }

      if (!data.queryselector) {
        console.error("Provide a query selector to query");
        return null;
      }

      parameters = parameters ? `/${parameters}` : "";

      // here build the url to get the data from the api
      const url = `${this.serviceEndpoints.baseUrl}${this.serviceEndpoints.get}/${data.queryselector}${parameters}`;

      const response = await fetch(url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.api_token}`,
        },
      });

      const result = await response.json();
      return result;
    } catch (error) {
      console.error(error);
      return error.body;
    }
  }

  // this mmethod is used to create a new entity in the api
  async create(payload) {
    try {
      if (!payload) {
        return null;
      }

      const url = `${this.serviceEndpoints.baseUrl}${this.serviceEndpoints.create}`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.api_token}`,
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();
      return result;
    } catch (error) {
      console.error(error);
      return error.response.data || null;
    }
  }

  // this mmethod is used to send POST reuest to  the api
  async post(payload) {
    try {
      if (!payload) {
        return null;
      }

      const url = `${this.serviceEndpoints.baseUrl}${this.serviceEndpoints.post}`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.api_token}`,
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();
      return result;
    } catch (error) {
      console.error(error);
      return error.response.data || null;
    }
  }

  // this method is used to update an entity in the api
  async update(payload) {
    try {
      if (!payload) {
        return null;
      }

      const response = await fetch(
        `${this.serviceEndpoints.baseUrl}${this.serviceEndpoints.update}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${this.api_token}`,
          },
          body: JSON.stringify(payload),
        }
      );

      const result = await response.json();
      return result;
    } catch (error) {
      console.error(error);
      return error.body;
    }
  }

  // this method is used to delete an entity in the api
  async delete(payload) {
    try {
      if (!payload) {
        return null;
      }

      const response = await fetch(
        `${this.serviceEndpoints.baseUrl}${this.serviceEndpoints.delete}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${this.api_token}`,
          },
          body: JSON.stringify(payload),
        }
      );

      const result = await response.json();
      return result;
    } catch (error) {
      console.error(error);
      return error.body;
    }
  }
}
