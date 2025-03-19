import { AuthAPIService } from "./AuthAPIService";
import { BaseAPIService } from "./BaseAPIService";
import { UserAPIService } from "./UserAPIService";

export class APIService {
  constructor() {
    this.Auth = new AuthAPIService();
    this.Users = new UserAPIService();
    this.Artists = new BaseAPIService("artists");
    this.Services = new BaseAPIService("services");
    this.Appointments = new BaseAPIService("appointments");
    this.Photos = new BaseAPIService("photos");
    this.Reviews = new BaseAPIService("reviews");
  }
}
