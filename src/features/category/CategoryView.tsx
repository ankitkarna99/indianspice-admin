import { Button, Modal, Spin, Form, Input } from "antd";
import { useForm } from "antd/lib/form/Form";
import React from "react";
import styled from "styled-components";
import Card from "../../common/components/Card";
import Center from "../../common/components/Center";
import MainTemplate from "../../common/templates/main/MainTemplate";
import CategoryItem from "./components/CategoryItem";
import useCategoryView from "./useCategoryView";

const CategoryViewStyles = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 2rem;

  & > div {
    position: relative;
  }
`;

function CategoryView() {
  const {
    apiManager,
    getCategories,
    categories,
    selectedCategory,
    isModalOpen,
    openEditModal,
    setModalOpen,
    updateCategory,
    isUpdatingCategory,
    form,
    addCategory,
    isAddModalOpen,
    setAddModalOpen,
    isAddingCategory
  } = useCategoryView();

  return (
    <MainTemplate>
      {apiManager.busy && (
        <Center>
          <Spin size="large" />
        </Center>
      )}
      {apiManager.hasError && (
        <Center>
          <Button htmlType="button" onClick={getCategories}>
            Try Again
          </Button>
        </Center>
      )}
      {!apiManager.hasError && !apiManager.busy && (
        <>
          <div className="title flex jcsb">
            <div>
              App Categories
            </div>
            <Button type="primary" onClick={() => {
              form.resetFields();
              setAddModalOpen(true);
            }}>Add Category</Button>
          </div>
          <CategoryViewStyles>
            {categories.map((category) => (
              <CategoryItem
                category={category}
                key={category.id}
                openEditModal={openEditModal}
              />
            ))}
          </CategoryViewStyles>
        </>
      )}

      <Modal
        title="Update Category"
        visible={isModalOpen}
        onOk={async () => {
          return updateCategory({
            ...form.getFieldsValue(),
             id: selectedCategory?.id,
          });
        }}
        confirmLoading={isUpdatingCategory}
        onCancel={() => {
          setModalOpen(false);
        }}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            label="Name"
            rules={[
              {
                required: true,
                message: "Name is required.",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="URL"
            name="url"
            rules={[{ required: true, message: "URL is required." }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Sort Order"
            name="sort_order"
            rules={[{ required: true, message: "Sort order is required." }]}
          >
            <Input type="number" />
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="Add Category"
        visible={isAddModalOpen}
        onOk={() => {
          addCategory({
            ...form.getFieldsValue(),
            id: selectedCategory?.id,
          });
        }}
        confirmLoading={isAddingCategory}
        onCancel={() => {
          setAddModalOpen(false);
        }}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            label="Name"
            rules={[
              {
                required: true,
                message: "Name is required.",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="URL"
            name="url"
            rules={[{ required: true, message: "URL is required." }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Sort Order"
            name="sort_order"
            rules={[{ required: true, message: "Sort order is required." }]}
          >
            <Input type="number" />
          </Form.Item>
        </Form>
      </Modal>
    </MainTemplate>
  );
}

export default CategoryView;
