import { Typography } from "@material-ui/core";
import React, { useContext, useEffect } from "react";
import Wrapper from "../components/UniversalComponents/Wrapper";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth/authState";
const TypographyBody = styled.div`
  width: 100%;
  height: 100px;
  padding-top: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  h1 {
    margin-bottom: 25px;
  }
`;
const linkStyle = {
  textDecoration: "none",
  color: "rgba(255, 255, 255, 0.87)",
  fontWeight: 700,
};
function Home() {
  const authContext = useContext(AuthContext);

  return (
    <Wrapper>
      <TypographyBody>
        <Typography variant="h4" component="h1">
          Hi, great to see you!
        </Typography>
        <Typography variant="h6" component="p">
          To use the app just{" "}
          <Link style={linkStyle} to="/register">
            register
          </Link>{" "}
          or{" "}
          <Link to="/login" style={linkStyle}>
            login
          </Link>
          . <br></br> After that you will be rediricted to quick guide of how to
          use the app. <br></br> Enjoy &lt;3
        </Typography>
      </TypographyBody>
    </Wrapper>
  );
}

export default Home;
