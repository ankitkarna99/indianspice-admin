import React from "react";
import { IconType } from "react-icons";
import styled from "styled-components";

interface Props {
  Icon: IconType;
  onClick?: () => void;
}

const IconButtonStyles = styled.div`
  border-radius: 50%;
  padding: 1.25rem;
  background: var(--white);
  cursor: pointer;
  display: flex;
`;

function IconButton({ Icon, onClick }: Props) {
  return (
    <IconButtonStyles onClick={onClick}>{<Icon size={20} />}</IconButtonStyles>
  );
}

export default IconButton;
