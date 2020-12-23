import React from "react";
import Header from "./Header";
import styled from "styled-components";
import { ThemeProvider, createMuiTheme } from "@material-ui/core";
const Main = styled.main`
  width: 100%;
  height: 80vh;
  display: flex;
  justify-content: center;
`;
function Layout({ children }) {
  const darkTheme = createMuiTheme({
    palette: {
      type: "dark",
    },
    typography: {
      fontFamily: ['"Open Sans"'].join(","),
    },
  });

  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <Header />
        <Main>{children}</Main>
        <footer></footer>
      </ThemeProvider>
    </>
  );
}

export default Layout;
