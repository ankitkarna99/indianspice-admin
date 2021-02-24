import React from "react";
import styled from "styled-components";

export enum CardVariant {
  DARK,
  LIGHT,
}

interface Props {
  variant: CardVariant;
  children: React.ReactNode;
}

const CardStyles = styled.div<{ variant: CardVariant }>`
  padding: 1.5rem;
  border-radius: 2rem;
  background: var(
    ${(props) =>
      props.variant === CardVariant.DARK ? "--dark-grey" : "--white"}
  );
  color: var(
    ${(props) => (props.variant === CardVariant.DARK ? "--white" : "--black")}
  );
`;

function Card({ variant, children }: Props) {
  return <CardStyles variant={variant}>{children}</CardStyles>;
}

export default Card;
