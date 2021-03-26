import axios from "../../axios";
import { CommonModel, ImageModel } from "../common.model";

export default abstract class CarouselApi {
  static getCarouselImages(): Promise<ImageModel[]> {
    return axios.get("/carousel");
  }

  static deleteImage(image: ImageModel): Promise<CommonModel> {
    const { id } = image;
    return axios.delete("/carousel/" + id);
  }

  static addImage(image: ImageModel): Promise<CommonModel> {
    return axios.post("/carousel", image);
  }
}
