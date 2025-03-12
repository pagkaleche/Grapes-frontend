import { APIClient } from "./APIClient";

export class BaseAPIService {
  constructor(endpoint) {
    this.endpoint = endpoint;
  }

  async getAll(params = null) {
    return APIClient.request({
      endpoint: `${this.endpoint}/`,
      params,
    });
  }

  async getById(id) {
    return APIClient.request({
      endpoint: `${this.endpoint}/${id}/`,
    });
  }

  async create(data) {
    return APIClient.request({
      endpoint: `${this.endpoint}/`,
      method: "POST",
      body: data,
    });
  }

  async update(id, data) {
    return APIClient.request({
      endpoint: `${this.endpoint}/${id}/`,
      method: "PUT",
      body: data,
    });
  }

  async delete(id) {
    return APIClient.request({
      endpoint: `${this.endpoint}/${id}/`,
      method: "DELETE",
    });
  }
}
