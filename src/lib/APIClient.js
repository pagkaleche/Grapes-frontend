import { BASE_API_URL } from "./Constants";

export class APIClient {
  static async request({
    endpoint,
    method = "GET",
    body = null,
    params = null,
    token = null,
  }) {
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

    var url = `api/${endpoint}`;

    if (params) {
      url = `${url}?${new URLSearchParams(params)}`;
    }

    let response = await fetch(url, options);

    if (method === "DELETE") {
      return {};
    }

    return await response.json();
  }
}
