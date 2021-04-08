import { useForm } from "antd/lib/form/Form";
import React from "react";
import useApi from "../../core/hooks/useApi";
import PromoApi, { PromoModel } from "../../core/http/providers/promo/promo.api";
import NotificationService from "../../core/services/NotificationService";

function usePromoView() {
  const apiManager = useApi();
  const [promo, setPromo] = React.useState<PromoModel[]>([]);
  const [addingPromo, setAddingPromo] = React.useState<boolean>(false);
  const [isModalOpen, setModalOpen] = React.useState<boolean>(false);
  const [form] = useForm();

  const getPromo = async () => {
    try {
      const promoResponse = await 
        apiManager.fetch(PromoApi.getPromo());
      setPromo(promoResponse);
    } catch (err) {}
  };

  const deletePromo = async (promo: PromoModel) => {
    try {
      const response = await apiManager.execute(PromoApi.deletePromo(promo));
      getPromo();
      NotificationService.showNotification("success", response.message);
    } catch (e) {}
  };

  const addPromo = async (promo: PromoModel) => {
    setAddingPromo(true);
    try {
      const response = await apiManager.execute(PromoApi.addPromo(promo));
      setAddingPromo(false);
      setModalOpen(false);
      getPromo();
      NotificationService.showNotification("success", response.message);
    } catch (e) {
      setAddingPromo(false);
    }
  };

  React.useEffect(() => {
    getPromo();
  }, []);

  return {
    apiManager,
    form,
    getPromo,
    promo,
    isModalOpen,
    setModalOpen,
    addingPromo,
    deletePromo,
    addPromo,
  };
}

export default usePromoView;
