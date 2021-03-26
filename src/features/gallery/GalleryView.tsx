import { Button, Modal, Spin, Form, Input, Select, Switch, Drawer } from "antd";
import { useForm } from "antd/lib/form/Form";
import FormItem from "antd/lib/form/FormItem";
import React from "react";
import DataTable from "react-data-table-component";
import { FiArrowUp, FiEdit, FiTrash } from "react-icons/fi";
import styled from "styled-components";
import Card from "../../common/components/Card";
import Center from "../../common/components/Center";
import IconButton from "../../common/components/IconButton";
import MainTemplate from "../../common/templates/main/MainTemplate";
import GalleryItem from "./components/GalleryItem";
import useGalleryView from "./useGalleryView";

const { Option } = Select;

const GalleryViewStyles = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 2rem;

  & > div {
    position: relative;
  }
`;

function GalleryView() {
  const {
    apiManager,
    images,
    getImages,
    isModalOpen,
    setModalOpen,
    deleteImage,
    isAddingImage,
    addImage,
    form,
  } = useGalleryView();

  return (
    <MainTemplate>
      {apiManager.busy && (
        <Center>
          <Spin size="large" />
        </Center>
      )}
      {apiManager.hasError && (
        <Center>
          <Button htmlType="button" onClick={getImages}>
            Try Again
          </Button>
        </Center>
      )}
      {!apiManager.hasError && !apiManager.busy && (
        <>
          <div className="title flex jcsb">
            <div>Gallery Images</div>
            <Button type="primary" onClick={() => setModalOpen(true)}>
              Add Image
            </Button>
          </div>

          <GalleryViewStyles>
            {images.map((image) => (
              <GalleryItem
                key={image.id}
                image={image}
                deleteImage={deleteImage}
              />
            ))}
          </GalleryViewStyles>

          <Modal
            title="Add Image"
            visible={isModalOpen}
            onOk={() => addImage(form.getFieldsValue())}
            confirmLoading={isAddingImage}
            onCancel={() => setModalOpen(false)}
          >
            <Form form={form} layout="vertical">
              <Form.Item
                label="URL"
                name="url"
                rules={[{ required: true, message: "URL is required!" }]}
              >
                <Input />
              </Form.Item>
            </Form>
          </Modal>
        </>
      )}
    </MainTemplate>
  );
}

export default GalleryView;
