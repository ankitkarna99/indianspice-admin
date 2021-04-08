import axios from "../../axios";
import { CommonModel } from "../common.model";

export interface PromoModel {
    id: string;
    title: string;
    code: string;
    discount_percent: string;
  }

export default abstract class PromoApi {
  static getPromo(): Promise<PromoModel[]> {
    return axios.get("/promo");
  }
  
  static deletePromo(promo: PromoModel): Promise<CommonModel> {
    const { id } = promo;
    return axios.delete("/promo/" + id);
  }

  static addPromo(promo: PromoModel): Promise<CommonModel> {
    return axios.post("/promo", promo);
  }
}
