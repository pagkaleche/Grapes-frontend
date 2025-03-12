import { APIClient } from "./APIClient";

export class AuthAPIService {
  constructor() {}

  async register(email, password) {
    return await APIClient.request({
      endpoint: "register/",
      method: "POST",
      body: {
        email: email,
        password: password,
      },
    });
  }

  async login(email, password) {
    return await APIClient.request({
      endpoint: "login/",
      method: "POST",
      body: {
        email: email,
        password: password,
      },
    });
  }
}
