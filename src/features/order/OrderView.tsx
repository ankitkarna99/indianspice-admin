import { Button, Drawer, Modal, Spin } from "antd";
import moment from "moment";
import React from "react";
import DataTable from "react-data-table-component";
import { FiArrowUp, FiEye, FiTrash } from "react-icons/fi";
import styled from "styled-components";
import Center from "../../common/components/Center";
import ScrollbarWrapper from "../../common/components/ScrollbarWrapper";
import MainTemplate from "../../common/templates/main/MainTemplate";
import useOrderView from "./useOrderView";

const OrderViewStyles = styled.div``;

function OrderView() {
    const {orders, apiManager, getOrders, deleteOrder, isModalOpen, setModalOpen, selectedOrder, setSelectedOrder, selectedOrderItems, setSelectedOrderItems} = useOrderView();
    const columns = [
        { 
            name: "Order Id", 
            cell: (row: any) => moment(row.created_at).valueOf() / 1000
        },
        {
          name: "Placed At",
          cell: (row: any) => moment(row.created_at).format("h:mm A, D MMM, YYYY")
        },
        {
          name: "Name",
          cell: (row: any) => row.first_name + " " + row.last_name
        },
        {
          name: "Order Type",
          selector: "order_type"
        },
        {
          name: "Payment Method",
          selector: "payment_method"
        },
        {
          name: "Actions",
          cell: (row: any) => (
            <div className="flex">
              <div style={{ cursor: "pointer" }}
              onClick={() =>{
                setModalOpen(true);
                setSelectedOrder(row);
                setSelectedOrderItems(JSON.parse(row.cart));
              }

              }
              >
                <FiEye
                  size="24"
                  style={{ marginRight: "1rem", color: "var(--primary)" }}
                />
              </div>
              <div
                style={{ cursor: "pointer" }}
                onClick={() =>
                  Modal.confirm({
                    title: "Are you sure?",
                    content:
                      "You are about to delete an order. Do this only if this is the intended action.",
    
                    onOk: async () => {
                      await deleteOrder(row);
                    },
                  })
                }
              >
                <FiTrash size="24" style={{ color: "var(--red)" }} />
              </div>
            </div>
          ),
        },
      ];
  return <MainTemplate>
      {apiManager.busy && (
        <Center>
          <Spin size="large" />
        </Center>
      )}
      {apiManager.hasError && (
        <Center>
          <Button htmlType="button" onClick={getOrders}>
            Try Again
          </Button>
        </Center>
      )}
      {!apiManager.hasError && !apiManager.busy && (
        <OrderViewStyles>
          <DataTable
            title="Dishes"
            columns={columns}
            data={orders}
            defaultSortField="title"
            sortIcon={<FiArrowUp />}
            pagination
          />
        </OrderViewStyles>
      )}
      <Drawer
        title="Order Details"
        visible={isModalOpen}
        width="30%"
        onClose={() => {
          setModalOpen(false);
        }}
      >

          <div style={{marginBottom: "0.5rem"}}>
              Order #: {moment(selectedOrder?.created_at).valueOf() /1000}
          </div>
          <div style={{marginBottom: "0.5rem"}}>
              Order Time: {selectedOrder?.order_time}
          </div>
          <div style={{marginBottom: "0.5rem"}}>
              Order Date: {selectedOrder?.order_date}
          </div>

          <br/>

          <h2>Billing Information:</h2>
          <hr/>
          <div style={{marginBottom: "0.5rem"}}>
              Name: {selectedOrder?.first_name + " " + selectedOrder?.last_name}
          </div>
          <div style={{marginBottom: "0.5rem"}}>
              Address: {selectedOrder?.address}
          </div>
          <div style={{marginBottom: "0.5rem"}}>
              City: {selectedOrder?.city}
          </div>
          <div style={{marginBottom: "0.5rem"}}>
              Zip: {selectedOrder?.zip_code}
          </div>
          <div style={{marginBottom: "0.5rem"}}>
              Email: {selectedOrder?.email}
          </div>
          <div style={{marginBottom: "0.5rem"}}>
              Phone: {selectedOrder?.phone_number}
          </div>
          <div style={{marginBottom: "0.5rem"}}>
              State: {selectedOrder?.state}
          </div>
          <div style={{marginBottom: "0.5rem"}}>
              Order Type: {selectedOrder?.order_type}
          </div>
          <div style={{marginBottom: "0.5rem"}}>
              Payment Method: {selectedOrder?.payment_method}
          </div>
          <br/>

          <table className="table table-hover table-striped">
              <thead>
                  <tr>
                      <td>S.N.</td>
                      <td>Item</td>
                      <td>Quantity</td>
                      <td>Price</td>
                      <td>Total</td>
                  </tr>
              </thead>
              <tbody>
          {selectedOrderItems.map((item:any, index: number) => {

                  return (<tr>
                      <td>{index + 1}</td>
                      <td>{item.title}</td>
                      <td>{item.quantity}</td>
                      <td>{item.unit_price}</td>
                      <td>{(item.quantity * item.unit_price).toFixed(2)}</td>
                  </tr>);
          })}
              </tbody>
          </table>

          <div style={{textAlign: "left", fontSize: "1.6rem", marginBottom: "0.5rem"}}>Discount: $ {selectedOrder?.discount}</div>
          <div style={{textAlign: "left", fontSize: "1.6rem", marginBottom: "0.5rem"}}>Tips: $ {selectedOrder?.tips}</div>
          <div style={{textAlign: "left", fontSize: "1.6rem", marginBottom: "0.5rem"}}>Delivery Charge: $ {selectedOrder?.delivery_charge}</div>
          <div style={{textAlign: "left", fontSize: "1.6rem", marginBottom: "0.5rem"}}>Tax: $ {selectedOrder?.tax_amount}</div>
          <div style={{textAlign: "left", fontSize: "1.6rem", marginBottom: "0.5rem"}}>Grand Total: $ {selectedOrder?.grand_total}</div>

          <br/>


      </Drawer>
  </MainTemplate>;
}

export default OrderView;
