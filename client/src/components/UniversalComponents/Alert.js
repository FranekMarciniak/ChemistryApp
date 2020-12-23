import React from "react";
import styled from "styled-components";
const AlertWrapper = styled.div`
  width: 90%;
  min-height: 50px;
  max-height: 75px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f50057;
  color: white;
  margin: 0px;
  padding: 0px;
`;
function Alert({ data }) {
  console.log(data);
  return (
    <AlertWrapper>
      <p>{data.join(" ")}</p>
    </AlertWrapper>
  );
}

export default Alert;
