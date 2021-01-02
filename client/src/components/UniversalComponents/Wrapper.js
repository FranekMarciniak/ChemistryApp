import React from "react";
import styled from "styled-components";
const WrapperSection = styled.section`
  width: 100%;
  min-height: 420px;
  min-width: 400px;
  max-width: 1300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 25px;
  @media (max-width: 1100px) {
    width: 80%;
  }
  @media (max-width: 970px) {
    width: 85%;
    margin: 15px;
  }
`;
function Wrapper({ children }) {
  return <WrapperSection>{children}</WrapperSection>;
}
export default Wrapper;
