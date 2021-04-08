import axios from "../../axios";
import { CommonModel } from "../common.model";

export interface DishModel {
  id: string;
  name: string;
  description: string;
  price: string;
  spicy: string;
  display: string;
  category_id: string;
}

export default abstract class DishApi {
  static getDishesByCategoryId(id: string): Promise<DishModel[]> {
    return axios.get("/dish/" + id);
  }

  static addDish(dish: DishModel): Promise<CommonModel> {
    return axios.post("/dish", dish);
  }

  static updateDish(dish: DishModel): Promise<CommonModel> {
    const { id, ...data } = dish;
    return axios.patch("/dish/" + id, data);
  }

  static deleteDish(dish: DishModel): Promise<CommonModel> {
    const { id } = dish;
    return axios.delete("/dish/" + id);
  }
}
