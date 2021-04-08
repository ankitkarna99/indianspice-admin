import { Button, Modal, Spin, Form, Input, Select, Switch, Drawer } from "antd";
import { useForm } from "antd/lib/form/Form";
import React from "react";
import DataTable from "react-data-table-component";
import { FiArrowUp, FiEdit, FiTrash } from "react-icons/fi";
import styled from "styled-components";
import Card from "../../common/components/Card";
import Center from "../../common/components/Center";
import IconButton from "../../common/components/IconButton";
import MainTemplate from "../../common/templates/main/MainTemplate";
import useDishesByCategoryView from "./useDishesByCategoryView";

const { Option } = Select;

const DishesByCategoryViewStyles = styled.div``;

function DishesByCategoryView() {
  const {
    id,
    apiManager,
    dishes,
    getDishesByCategory,
    form,
    updatingDish,
    categories,
    selectedDish,
    updateDish,
    addDish,
    addingDish,
    setModalOpen,
    openEditModal,
    deleteDish,
    isModalOpen,
    isAddModalOpen,
    setAddModalOpen,
    setSelectedDish
  } = useDishesByCategoryView();

  const columns = [
    { name: "Name", selector: "name", sortable: true },
    {
      name: "Price",
      selector: "price",
      sortable: true,
      format: (row: any) => "$" + row.price,
    },
    {
      name: "Actions",
      cell: (row: any) => (
        <div className="flex">
          <div onClick={() => openEditModal(row)} style={{ cursor: "pointer" }}>
            <FiEdit
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
                  "You are about to delete a product, instead you can just set the display to false. Do this only if this is the intended action.",

                onOk: async () => {
                  await deleteDish(row);
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
          <Button htmlType="button" onClick={getDishesByCategory}>
            Try Again
          </Button>
        </Center>
      )}
      {!apiManager.hasError && !apiManager.busy && (
        <DishesByCategoryViewStyles>
          <DataTable
            title="Dishes"
            actions={<div><Button type="primary" onClick={() => {setSelectedDish(null); form.resetFields(); form.setFieldsValue({display: "1",category_id: parseInt(id)}); setAddModalOpen(true);}}>Add Dish</Button></div>}
            columns={columns}
            data={dishes}
            defaultSortField="title"
            sortIcon={<FiArrowUp />}
            pagination
          />
        </DishesByCategoryViewStyles>
      )}

      <Drawer
        title="Update Dish"
        footer={
          <Button
            type="primary"
            loading={updatingDish}
            onClick={() =>
              updateDish({
                ...form.getFieldsValue(),
                id: selectedDish?.id,
                spicy: form.getFieldValue("spicy") == true ? "1" : "0",
                display: form.getFieldValue("display") == true ? "1" : "0",
              })
            }
          >
            Update Dish
          </Button>
        }
        visible={isModalOpen}
        width="30%"
        onClose={() => {
          setModalOpen(false);
        }}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "name is required." }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Description"
            name="description"
            rules={[{ required: true, message: "Description is required." }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Price"
            name="price"
            rules={[{ required: true, message: "Price is required." }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Spicy"
            name="spicy"
            rules={[{ required: true, message: "Spicy is required." }]}
            valuePropName="checked"
          >
            <Switch />
          </Form.Item>
          <Form.Item
            label="Display"
            name="display"
            rules={[{ required: true, message: "Display is required." }]}
            valuePropName="checked"
          >
            <Switch />
          </Form.Item>
          <Form.Item
            label="Category"
            name="category_id"
            rules={[{ required: true, message: "Category_id is required." }]}
          >
            <Select>
              {categories.map((category) => (
                <Option key={category.id} value={category.id}>
                  {category.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Drawer>
      <Drawer
        title="Add Dish"
        footer={
          <Button
            type="primary"
            loading={addingDish}
            onClick={() =>
              addDish({
                ...form.getFieldsValue(),
                id: 1,
                spicy: form.getFieldValue("spicy") == true ? "1" : "0",
                display: form.getFieldValue("display") == true ? "1" : "0",
              })
            }
          >
            Add Dish
          </Button>
        }
        visible={isAddModalOpen}
        width="30%"
        onClose={() => {
          setAddModalOpen(false);
        }}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "name is required." }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Description"
            name="description"
            rules={[{ required: true, message: "Description is required." }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Price"
            name="price"
            rules={[{ required: true, message: "Price is required." }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Spicy"
            name="spicy"
            rules={[{ required: true, message: "Spicy is required." }]}
            valuePropName="checked"
          >
            <Switch />
          </Form.Item>
          <Form.Item
            label="Display"
            name="display"
            rules={[{ required: true, message: "Display is required." }]}
            valuePropName="checked"
          >
            <Switch />
          </Form.Item>
          <Form.Item
            label="Category"
            name="category_id"
            rules={[{ required: true, message: "Category_id is required." }]}
          >
            <Select>
              {categories.map((category) => (
                <Option key={category.id} value={category.id}>
                  {category.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Drawer>
    </MainTemplate>
  );
}

export default DishesByCategoryView;
