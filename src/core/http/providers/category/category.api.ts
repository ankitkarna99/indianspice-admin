import axios from "../../axios";
import { CommonModel } from "../common.model";

export interface CategoryModel {
  id: number;
  name: string;
  url: string;
  sort_order: number;
}

export default class CategoryApi {
  static getAllCategories(): Promise<CategoryModel[]> {
    return axios.get("/category");
  }

  static addCategory(category: CategoryModel): Promise<CommonModel> {
    return axios.post("/category", category);
  }

  static updateCategory(category: CategoryModel): Promise<CommonModel> {
    const { id, ...data } = category;
    return axios.patch("/category/" + id, data);
  }
}
