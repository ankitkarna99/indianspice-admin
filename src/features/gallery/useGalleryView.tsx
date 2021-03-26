import { useForm } from "antd/lib/form/Form";
import React from "react";
import useApi from "../../core/hooks/useApi";
import { ImageModel } from "../../core/http/providers/common.model";
import ConfigApi from "../../core/http/providers/config/config.api";
import GalleryApi from "../../core/http/providers/gallery/gallery.api";
import NotificationService from "../../core/services/NotificationService";

function useGalleryView() {
  const apiManager = useApi();
  const [images, setImages] = React.useState<ImageModel[]>([]);
  const [isModalOpen, setModalOpen] = React.useState<boolean>(false);
  const [isAddingImage, setAddingImage] = React.useState<boolean>(false);
  const [form] = useForm();

  const addImage = async (data: ImageModel) => {
    try {
      setAddingImage(true);
      const response = await apiManager.fetch(GalleryApi.addImage(data));
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
      const response = await apiManager.fetch(GalleryApi.deleteImage(data));
      NotificationService.showNotification("success", response.message);
      getImages();
    } catch (err) {}
  };

  const getImages = async () => {
    try {
      const response = await apiManager.fetch(GalleryApi.getGalleryImages());
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

export default useGalleryView;
