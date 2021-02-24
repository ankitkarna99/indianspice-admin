import React from "react";
import AntDesignStyles from "../../styles/AntDesignStyles";
import GlobalStyles from "../../styles/GlobalStyles";
import Typography from "../../styles/Typography";

interface Props {
  children: React.ReactNode;
}

function Layout({ children }: Props) {
  return (
    <>
      <GlobalStyles />
      <Typography />
      <AntDesignStyles />
      {children}
    </>
  );
}

export default Layout;
