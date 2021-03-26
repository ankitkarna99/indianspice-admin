import React from "react";
import styled from "styled-components";
import IconButton from "../../components/IconButton";
import { FiLogOut, FiSettings } from "react-icons/fi";
import LocalStorageService from "../../../core/services/LocalStorageService";
import { useHistory } from "react-router-dom";

const TitleActionsStyles = styled.section`
  display: flex;

  & > * {
    margin-left: 1rem;
  }
`;

function TitleActions() {
  const history = useHistory();
  return (
    <TitleActionsStyles>
      <IconButton
        Icon={FiSettings}
        onClick={() => {
          history.push("/config");
        }}
      ></IconButton>
      <IconButton
        Icon={FiLogOut}
        onClick={() => {
          LocalStorageService.clearTokens();
          history.replace("/login");
        }}
      ></IconButton>
    </TitleActionsStyles>
  );
}

export default TitleActions;
