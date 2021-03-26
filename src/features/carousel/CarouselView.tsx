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
import CarouselItem from "./components/CarouselItem";
import useCarouselView from "./useCarouselView";
import useGalleryView from "./useCarouselView";

const { Option } = Select;

const CarouselViewStyles = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 2rem;

  & > div {
    position: relative;
  }
`;

function CarouselView() {
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
  } = useCarouselView();

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
            <div>Carousel Images</div>
            <Button type="primary" onClick={() => setModalOpen(true)}>
              Add Image
            </Button>
          </div>

          <CarouselViewStyles>
            {images.map((image) => (
              <CarouselItem
                deleteImage={deleteImage}
                key={image.id}
                image={image}
              />
            ))}
          </CarouselViewStyles>
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

export default CarouselView;
