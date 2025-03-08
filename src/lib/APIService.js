import { AuthAPIService } from "./AuthAPIService";
import { BaseAPIService } from "./BaseAPIService";

export class APIService {
  constructor() {
    this.Auth = new AuthAPIService();
    this.Artists = new BaseAPIService("artists");
    this.Services = new BaseAPIService("services");
    this.Appointments = new BaseAPIService("appointments");
  }
}
