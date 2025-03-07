import { BASE_API_URL } from "./Constants";

// TODO: I suggest to get token from storage. localStorage, redux, useContext - whatever
const token = null;

export class APIClient {
  static async request(endpoint, method = "GET", body = null) {
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
