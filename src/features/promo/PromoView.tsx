import { Button, Modal, Spin, Form, Input } from "antd";
import DataTable from "react-data-table-component";
import { FiArrowUp, FiTrash } from "react-icons/fi";
import styled from "styled-components";
import Center from "../../common/components/Center";
import MainTemplate from "../../common/templates/main/MainTemplate";
import usePromoView from "./usePromoView";

const PromoViewStyles = styled.div``;

function PromoView() {
  const {
    apiManager,
    getPromo,
    form,
    promo,
    addPromo,
    addingPromo,
    setModalOpen,
    isModalOpen,
    deletePromo
  } = usePromoView();

  const columns = [
    { name: "Title", selector: "title" },
    {
      name: "Code",
      selector: "code",
    },
    {
      name: "Discount %",
      selector: "discount_percent",
    },
    {
      name: "Actions",
      cell: (row: any) => (
        <div className="flex">
          <div
            style={{ cursor: "pointer" }}
            onClick={() =>
              Modal.confirm({
                title: "Are you sure?",
                content:
                  "You are about to delete a promo code. Do this only if this is the intended action.",

                onOk: async () => {
                  await deletePromo(row);
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

  return (
    <MainTemplate>
      {apiManager.busy && (
        <Center>
          <Spin size="large" />
        </Center>
      )}
      {apiManager.hasError && (
        <Center>
          <Button htmlType="button" onClick={getPromo}>
            Try Again
          </Button>
        </Center>
      )}
      {!apiManager.hasError && !apiManager.busy && (
        <PromoViewStyles>
          <DataTable
            title="Dishes"
            actions={<div><Button type="primary" onClick={() => {form.resetFields(); setModalOpen(true);}}>Add Promo Code</Button></div>}
            columns={columns}
            data={promo}
            sortIcon={<FiArrowUp />}
            pagination
          />
        </PromoViewStyles>
      )}

      
      <Modal
        title="Add Promo Code"
        footer={
          <Button
            type="primary"
            loading={addingPromo}
            onClick={() =>
              addPromo({
                ...form.getFieldsValue(),
              })
            }
          >
            Add Dish
          </Button>
        }
        visible={isModalOpen}
        width="30%"
        onCancel={() => {
          setModalOpen(false);
        }}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            label="Title"
            name="title"
            rules={[{ required: true, message: "Title is required." }]}
          >
            <Input />
          </Form.Item>
          
          <Form.Item
            label="Code"
            name="code"
            rules={[{ required: true, message: "Code is required." }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Discount %"
            name="discount_percent"
            rules={[{ required: true, message: "Discount Percent is required." }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </MainTemplate>
  );
}

export default PromoView;
