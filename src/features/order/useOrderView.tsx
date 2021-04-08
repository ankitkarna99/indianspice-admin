import React from "react";
import useApi from "../../core/hooks/useApi";
import OrderApi, { OrderModel } from "../../core/http/providers/order/order.api";
import NotificationService from "../../core/services/NotificationService";

function useOrderView() {
  const apiManager = useApi();
  const [isModalOpen, setModalOpen] = React.useState<boolean>(false);
  const [orders, setOrders] = React.useState<OrderModel[]>([]);
  const [selectedOrder, setSelectedOrder] = React.useState<OrderModel | null>(null);
  const [selectedOrderItems, setSelectedOrderItems] = React.useState([]);

  const getOrders = async () => {
    try {
      const ordersResponse = await 
        apiManager.fetch(OrderApi.getOrders());

      setOrders(ordersResponse);
    } catch (err) {}
  };

  const deleteOrder = async (order: OrderModel) => {
    try {
      const response = await apiManager.execute(OrderApi.deleteOrder(order));
      getOrders();
      NotificationService.showNotification("success", response.message);
    } catch (e) {}
  };

  React.useEffect(() => {
    getOrders();
  }, []);

  return {
    apiManager,
    getOrders,
    orders,
    deleteOrder,
    isModalOpen,
    setModalOpen,
    selectedOrder,
    setSelectedOrder,
    selectedOrderItems,
    setSelectedOrderItems
  };
}

export default useOrderView;
