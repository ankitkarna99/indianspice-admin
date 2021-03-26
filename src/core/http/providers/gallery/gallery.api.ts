import axios from "../../axios";
import { CommonModel, ImageModel } from "../common.model";

export default abstract class GalleryApi {
  static getGalleryImages(): Promise<ImageModel[]> {
    return axios.get("/gallery");
  }

  static deleteImage(image: ImageModel): Promise<CommonModel> {
    const { id } = image;
    return axios.delete("/gallery/" + id);
  }

  static addImage(image: ImageModel): Promise<CommonModel> {
    return axios.post("/gallery", image);
  }
}
