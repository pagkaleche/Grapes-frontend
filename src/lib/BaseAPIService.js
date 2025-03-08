import { APIClient } from "./APIClient";

export class BaseAPIService {
  constructor(endpoint) {
    this.endpoint = endpoint;
  }

  async getAll(token = null) {
    return APIClient.request(`${this.endpoint}/`);
  }

  async getById(id, token = null) {
    return APIClient.request(`${this.endpoint}/${id}`);
  }

  async create(data, token = null) {
    return APIClient.request(`${this.endpoint}/`, "POST", data, token);
  }

  async update(id, data, token = null) {
    return APIClient.request(`${this.endpoint}/${id}/`, "PUT", data, token);
  }

  async delete(id, token = null) {
    return APIClient.request(`${this.endpoint}/${id}/`, "DELETE", null, token);
  }
}
