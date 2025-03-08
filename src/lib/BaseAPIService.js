import { APIClient } from "./APIClient";

export class BaseAPIService {
  constructor(endpoint) {
    this.endpoint = endpoint;
  }

  async getAll() {
    return APIClient.request(`${this.endpoint}/`);
  }

  async getById(id) {
    return APIClient.request(`${this.endpoint}/${id}`);
  }

  async create(data) {
    return APIClient.request(`${this.endpoint}/`, "POST", data);
  }

  async update(id, data) {
    return APIClient.request(`${this.endpoint}/${id}/`, "PUT", data);
  }

  async delete(id) {
    return APIClient.request(`${this.endpoint}/${id}/`, "DELETE");
  }
}
