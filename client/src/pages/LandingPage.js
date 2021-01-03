import React, { useContext, useEffect } from "react";
import Wrapper from "../components/UniversalComponents/Wrapper";
import { AuthContext } from "../context/auth/authState";
function Home() {
  const authContext = useContext(AuthContext);

  return (
    <Wrapper>
      <h1>landing</h1>
    </Wrapper>
  );
}

export default Home;
