import React from "react";
import { IconType } from "react-icons/lib";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

interface Props {
  Icon: IconType;
  onClick?: () => void;
  text: string;
}

const SidebarListTileStyles = styled.div`
  border-left: 3px solid transparent;

  padding: 0.25rem 0 0.25rem 1.75rem;
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;
  cursor: pointer;

  & > div:first-of-type {
    margin-right: 2rem;
  }
`;

function SidebarListTile({ Icon, onClick, text }: Props) {
  return (
    <SidebarListTileStyles onClick={onClick}>
      <div>{<Icon size={24} />}</div>
      <div>{text}</div>
    </SidebarListTileStyles>
  );
}

export default SidebarListTile;
