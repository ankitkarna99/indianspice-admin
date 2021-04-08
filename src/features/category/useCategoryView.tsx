import { useForm } from "antd/lib/form/Form";
import React from "react";
import useApi from "../../core/hooks/useApi";
import CategoryApi, {
  CategoryModel,
} from "../../core/http/providers/category/category.api";
import NotificationService from "../../core/services/NotificationService";

function useCategoryView() {
  const apiManager = useApi();
  const [categories, setCategories] = React.useState<CategoryModel[]>([]);
  const [
    selectedCategory,
    setSelectedCategory,
  ] = React.useState<CategoryModel | null>(null);
  const [isModalOpen, setModalOpen] = React.useState(false);
  const [isAddModalOpen, setAddModalOpen] = React.useState(false);
  const [isAddingCategory, setAddingCategory] = React.useState(false);
  const [isUpdatingCategory, setUpdatingCategory] = React.useState(false);
  const [form] = useForm();

  const openEditModal = (category: CategoryModel) => {
    setSelectedCategory(category);
    form.setFieldsValue(category);
    setModalOpen(true);
  };

  const updateCategory = async (category: CategoryModel) => {
    try {
      setUpdatingCategory(true);

      const response = await apiManager.execute(
        CategoryApi.updateCategory(category)
      );

      setUpdatingCategory(false);
      setModalOpen(false);
      NotificationService.showNotification("success", response.message);
      getCategories();
    } catch (err) {
      setUpdatingCategory(false);
    }
  };

  const addCategory = async (category: CategoryModel) => {
    try {
      setAddingCategory(true);

      const response = await apiManager.execute(
        CategoryApi.addCategory(category)
      );

      setAddingCategory(false);
      setAddModalOpen(false);
      NotificationService.showNotification("success", response.message);
      getCategories();
    } catch (err) {
      setAddingCategory(false);
    }
  };

  const getCategories = async () => {
    try {
      const response = await apiManager.fetch(CategoryApi.getAllCategories());
      setCategories(response);
    } catch (err) {}
  };

  React.useEffect(() => {
    getCategories();
  }, []);

  return {
    apiManager,
    getCategories,
    categories,
    selectedCategory,
    updateCategory,
    isModalOpen,
    openEditModal,
    setModalOpen,
    isUpdatingCategory,
    form,
    isAddModalOpen,
    setAddModalOpen,
    isAddingCategory,
    addCategory
  };
}

export default useCategoryView;
