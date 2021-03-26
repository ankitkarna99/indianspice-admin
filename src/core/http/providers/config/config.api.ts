import axios from "../../axios";
import { CommonModel } from "../common.model";

export default class ConfigApi {
  static getConfig(): Promise<any> {
    return axios.get("/config");
  }

  static saveConfig(data: any): Promise<CommonModel> {
    return axios.post("/config", data);
  }

  static savePrivateConfig(data: any): Promise<CommonModel> {
    return axios.post("/config/private", data);
  }

  static getPrivateConfig(): Promise<any> {
    return axios.get("/config/private");
  }
}
