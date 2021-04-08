import axios from "../../axios";
import { CommonModel } from "../common.model";

export interface OrderModel {
    id: string;
    sub_total: string;
    order_type: string;
    payment_method: string;
    created_at: string;
    updated_at: string;
    first_name: string;
    last_name: string;
    email: string;
    phone_number: string;
    address: string;
    apt_suite_floor: string;
    city: string;
    state: string;
    zip_code: string;
    cart: string;
    notes: string;
    promo_code: string;
    discount: string;
    tax_amount: string;
    delivery_charge: string;
    tips: string;
    grand_total: string;
    order_date: string;
    order_time: string;
  }

export default abstract class OrderApi {
  static getOrders(): Promise<OrderModel[]> {
    return axios.get("/order");
  }

  static deleteOrder(order: OrderModel): Promise<CommonModel> {
    const { id } = order;
    return axios.delete("/order/" + id);
  }
}
