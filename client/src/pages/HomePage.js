import React, { useContext, useEffect } from "react";
import Wrapper from "../components/UniversalComponents/Wrapper";
import { AuthContext } from "../context/auth/authState";
function Home() {
  const authContext = useContext(AuthContext);
  useEffect(() => {
    authContext.loadUser();
  }, []);
  return (
    <Wrapper>
      <h1>Hello</h1>
    </Wrapper>
  );
}

export default Home;
