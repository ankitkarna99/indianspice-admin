import React from "react";
import { Scrollbars } from "react-custom-scrollbars";

interface Props {
  children: React.ReactNode;
}

function ScrollbarWrapper({ children }: Props) {
  return (
    <Scrollbars className="custom-scrollbar" autoHide={true}>
      {children}
    </Scrollbars>
  );
}

export default ScrollbarWrapper;
