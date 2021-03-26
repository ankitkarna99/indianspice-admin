import { useForm } from "antd/lib/form/Form";
import React from "react";
import useApi from "../../core/hooks/useApi";
import CarouselApi from "../../core/http/providers/carousel/carousel.api";
import { ImageModel } from "../../core/http/providers/common.model";
import NotificationService from "../../core/services/NotificationService";

function useCarouselView() {
  const apiManager = useApi();
  const [images, setImages] = React.useState<ImageModel[]>([]);
  const [isModalOpen, setModalOpen] = React.useState<boolean>(false);
  const [isAddingImage, setAddingImage] = React.useState<boolean>(false);
  const [form] = useForm();

  const addImage = async (data: ImageModel) => {
    try {
      setAddingImage(true);
      const response = await apiManager.fetch(CarouselApi.addImage(data));
      NotificationService.showNotification("success", response.message);
      setAddingImage(false);
      setModalOpen(false);
      form.resetFields();
      getImages();
    } catch (err) {
      setAddingImage(false);
    }
  };

  const deleteImage = async (data: ImageModel) => {
    try {
      const response = await apiManager.fetch(CarouselApi.deleteImage(data));
      NotificationService.showNotification("success", response.message);
      getImages();
    } catch (err) {}
  };

  const getImages = async () => {
    try {
      const response = await apiManager.fetch(CarouselApi.getCarouselImages());
      setImages(response);
    } catch (err) {}
  };

  React.useEffect(() => {
    getImages();
  }, []);

  return {
    apiManager,
    getImages,
    images,
    isModalOpen,
    setModalOpen,
    isAddingImage,
    form,
    addImage,
    deleteImage,
  };
}

export default useCarouselView;
