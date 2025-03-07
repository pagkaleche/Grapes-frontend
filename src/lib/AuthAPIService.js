import { APIClient } from "./APIClient";

export class AuthAPIService {
  constructor() {}

  async register(email, password) {
    return await APIClient.request("register/", "POST", {
      email: email,
      password: password,
    });
  }

  async login(email, password) {
    return await APIClient.request("login/", "POST", {
      email: email,
      password: password,
    });
  }
}
