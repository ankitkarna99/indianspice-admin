import React from "react";
import styled from "styled-components";
import SearchBox from "../../components/SearchBox";
import TitleActions from "./TitleActions";

const TitlebarStyles = styled.div`
  margin-bottom: 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

function Titlebar() {
  return (
    <TitlebarStyles>
      <SearchBox />
      <TitleActions />
    </TitlebarStyles>
  );
}

export default Titlebar;
