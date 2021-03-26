import React from "react";
import { FiDelete, FiEdit, FiTrash } from "react-icons/fi";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Card from "../../../common/components/Card";
import IconButton from "../../../common/components/IconButton";
import { CategoryModel } from "../../../core/http/providers/category/category.api";

interface Props {
  category: CategoryModel;
  openEditModal(category: CategoryModel): void;
}

const CategoryItemStyles = styled.div`
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

function CategoryItem({ category, openEditModal }: Props) {
  return (
    <Card variant="light">
      <CategoryItemStyles>
        <img src={category.url} />
        <Link to={"/categories/" + category.id}>
          <p>{category.name}</p>
        </Link>
        <div className="delete">
          <IconButton Icon={FiEdit} onClick={() => openEditModal(category)} />
        </div>
      </CategoryItemStyles>
    </Card>
  );
}

export default CategoryItem;
