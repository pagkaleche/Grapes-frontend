import { APIClient } from "./APIClient";

export class BaseAPIService {
  constructor(endpoint) {
    this.endpoint = endpoint;
  }

  async getAll(params = null, token=null) {
    return APIClient.request({
      endpoint: `${this.endpoint}/`,
      params,
      token,
    });
  }

  async getById(id, token=null) {
    return APIClient.request({
      endpoint: `${this.endpoint}/${id}/`,
      token,
    });
  }

  async create(data, token=null) {
    return APIClient.request({
      endpoint: `${this.endpoint}/`,
      method: "POST",
      body: data,
      token,
    });
  }

  async update(id, data, token=null) {
    return APIClient.request({
      endpoint: `${this.endpoint}/${id}/`,
      method: "PUT",
      body: data,
      token,
    });
  }

  async delete(id, token=null) {
    return APIClient.request({
      endpoint: `${this.endpoint}/${id}/`,
      method: "DELETE",
      token,
    });
  }
}
