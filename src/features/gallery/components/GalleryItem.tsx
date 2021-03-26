import { Modal } from "antd";
import React from "react";
import { FiDelete, FiEdit, FiTrash } from "react-icons/fi";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Card from "../../../common/components/Card";
import IconButton from "../../../common/components/IconButton";
import { ImageModel } from "../../../core/http/providers/common.model";

interface Props {
  image: ImageModel;
  deleteImage: (image: ImageModel) => Promise<void>;
}

const GalleryItemStyles = styled.div`
  img {
    width: 100%;
    height: 150px;
    object-fit: cover;
  }

  p {
    font-weight: bold;
    text-align: center;
    margin-top: 1rem;
  }

  .delete {
    position: absolute;
    top: 0;
    right: 0;
  }
`;

function GalleryItem({ image, deleteImage }: Props) {
  return (
    <Card variant="light">
      <GalleryItemStyles>
        <img src={image.url} />

        <div className="delete">
          <IconButton
            Icon={FiTrash}
            onClick={() => {
              Modal.confirm({
                title: "Are you sure?",
                content:
                  "You are about to delete a gallery image. Do this only if this is the intended action.",
                onOk: async () => {
                  await deleteImage(image);
                },
              });
            }}
          />
        </div>
      </GalleryItemStyles>
    </Card>
  );
}

export default GalleryItem;
