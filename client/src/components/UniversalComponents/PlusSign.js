import React from "react";
import styled from "styled-components";
const SignWrapper = styled.span`
  height: 32px;
  width: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
function PlusSign() {
  return (
    <SignWrapper>
      <em>+</em>
    </SignWrapper>
  );
}

export default PlusSign;
