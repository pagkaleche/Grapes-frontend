import { BaseAPIService } from "./BaseAPIService";
import { APIClient } from "./APIClient";

export class UserAPIService extends BaseAPIService {
  constructor(endpoint) {
    super('users');
  }

  async me(token=null) {
    return APIClient.request({
      endpoint: `${this.endpoint}/me/`,
      method: "GET",
      token,
    });
  }
}
