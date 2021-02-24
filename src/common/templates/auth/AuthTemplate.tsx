import React from "react";
import styled from "styled-components";
import Card, { CardVariant } from "../../components/Card";

interface Props {
  children: React.ReactNode;
}

const AuthTemplateStyles = styled.div`
  section {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 25%;
    transform: translate(-50%, -50%);
  }
`;

function AuthTemplate({ children }: Props) {
  return (
    <AuthTemplateStyles>
      <section>
        <Card variant={CardVariant.LIGHT}>{children}</Card>
      </section>
    </AuthTemplateStyles>
  );
}

export default AuthTemplate;
