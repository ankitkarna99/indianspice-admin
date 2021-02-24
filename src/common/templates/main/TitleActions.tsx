import React from "react";
import styled from "styled-components";
import IconButton from "../../components/IconButton";
import { FiBell } from "react-icons/fi";

const TitleActionsStyles = styled.section`
  display: flex;

  & > * {
    margin-left: 1rem;
  }
`;

function TitleActions() {
  return (
    <TitleActionsStyles>
      <IconButton Icon={FiBell}></IconButton>
      <IconButton Icon={FiBell}></IconButton>
      <IconButton Icon={FiBell}></IconButton>
      <IconButton Icon={FiBell}></IconButton>
    </TitleActionsStyles>
  );
}

export default TitleActions;
