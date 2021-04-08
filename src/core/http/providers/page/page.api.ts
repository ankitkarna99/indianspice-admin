import axios from "../../axios";
import { CommonModel } from "../common.model";

export default class PageApi {
  static getPages(): Promise<any> {
    return axios.get("/page");
  }

  static savePages(data: any): Promise<CommonModel> {
    return axios.post("/page", data);
  }
}
