import { useForm } from "antd/lib/form/Form";
import React from "react";
import { useHistory, useParams } from "react-router-dom";
import useApi from "../../core/hooks/useApi";
import CategoryApi, {
  CategoryModel,
} from "../../core/http/providers/category/category.api";
import DishApi, { DishModel } from "../../core/http/providers/dish/dish.api";
import NotificationService from "../../core/services/NotificationService";

function useDishesByCategoryView() {
  const apiManager = useApi();
  const [dishes, setDishes] = React.useState<DishModel[]>([]);
  const [updatingDish, setUpdatingDish] = React.useState<boolean>(false);
  const [selectedDish, setSelectedDish] = React.useState<DishModel | null>(
    null
  );
  const [categories, setCategories] = React.useState<CategoryModel[]>([]);
  const [isModalOpen, setModalOpen] = React.useState<boolean>(false);
  const [form] = useForm();
  const { id } = useParams<{ id: string }>();

  const getDishesByCategory = async () => {
    try {
      const [dishesResponse, categoriesResponse] = await Promise.all([
        apiManager.fetch(DishApi.getDishesByCategoryId(id)),
        apiManager.fetch(CategoryApi.getAllCategories()),
      ]);
      setDishes(dishesResponse);
      setCategories(categoriesResponse);
    } catch (err) {}
  };

  const deleteDish = async (dish: DishModel) => {
    try {
      const response = await apiManager.execute(DishApi.deleteDish(dish));
      getDishesByCategory();
      NotificationService.showNotification("success", response.message);
    } catch (e) {}
  };

  const updateDish = async (dish: DishModel) => {
    setUpdatingDish(true);
    try {
      const response = await apiManager.execute(DishApi.updateDish(dish));
      setUpdatingDish(false);
      setModalOpen(false);
      getDishesByCategory();
      NotificationService.showNotification("success", response.message);
    } catch (e) {
      setUpdatingDish(false);
    }
  };

  const openEditModal = (dish: DishModel) => {
    setSelectedDish(dish);
    form.setFieldsValue({
      ...dish,
      spicy: dish.spicy == "1",
      display: dish.display == "1",
    });
    setModalOpen(true);
  };

  React.useEffect(() => {
    getDishesByCategory();
  }, []);

  return {
    apiManager,
    form,
    getDishesByCategory,
    dishes,
    categories,
    isModalOpen,
    setModalOpen,
    selectedDish,
    updateDish,
    openEditModal,
    updatingDish,
    deleteDish,
  };
}

export default useDishesByCategoryView;
