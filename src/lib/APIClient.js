import { BASE_API_URL } from "./Constants";

export class APIClient {
  static async request(endpoint, method = "GET", body = null, token = null) {
    let headers = {
      "Content-Type": "application/json",
    };

    if (token) {
      headers.Authorization = `Token ${token}`;
    }

    let options = {
      method: method,
      headers: headers,
    };

    if (body) {
      options.body = JSON.stringify(body);
    }

    let response = await fetch(`${BASE_API_URL}/${endpoint}`, options);

    if (method === "DELETE") {
      return {};
    }

    return await response.json();
  }
}
