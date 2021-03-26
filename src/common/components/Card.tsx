import React from "react";
import styled from "styled-components";

interface Props {
  variant: "dark" | "light";
  children: React.ReactNode;
}

const CardStyles = styled.div<{ variant: "dark" | "light" }>`
  padding: 1.5rem;
  border-radius: 2rem;
  background: var(
    ${(props) => (props.variant === "dark" ? "--dark-grey" : "--white")}
  );
  color: var(${(props) => (props.variant === "dark" ? "--white" : "--black")});
`;

function Card({ variant, children }: Props) {
  return <CardStyles variant={variant}>{children}</CardStyles>;
}

export default Card;
