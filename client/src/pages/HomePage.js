import React, { useContext, useEffect } from "react";
import Wrapper from "../components/UniversalComponents/Wrapper";
import { AuthContext } from "../context/auth/authState";
import { Typography } from "@material-ui/core";
function Home() {
  const authContext = useContext(AuthContext);
  useEffect(() => {
    authContext.loadUser();
  }, []);
  return (
    <Wrapper>
      <Typography variant="h4">Glad to see you</Typography>
    </Wrapper>
  );
}

export default Home;
