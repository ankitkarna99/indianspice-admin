import React from "react";
import styled from "styled-components";
import ScrollbarWrapper from "../../components/ScrollbarWrapper";
import Sidebar from "./Sidebar";
import Titlebar from "./Titlebar";

interface Props {
  children: React.ReactNode;
}

const MainTemplateStyles = styled.div`
  display: grid;
  grid-template-columns: 1fr 5fr;
  padding: 1.5rem;

  .routeContents {
    background: var(--light-grey);
    height: calc(100vh - 9.25rem);
    border-radius: 2rem;
    padding: 2rem;
  }
`;

function MainTemplate({ children }: Props) {
  return (
    <MainTemplateStyles>
      <Sidebar />
      <section>
        <Titlebar />
        <div className="routeContents">
          <ScrollbarWrapper>{children}</ScrollbarWrapper>
        </div>
      </section>
    </MainTemplateStyles>
  );
}

export default MainTemplate;
