import React from "react";
import arrow from "../../assets/method-draw-image.svg";
import styled from "styled-components";
import { Typography } from "@material-ui/core";
const MiddleArrowWrapper = styled.div`
  display: flex;
  width: 80px;
  height: 30px;
  margin-right: 10px;
  margin-left: 10px;
  margin-bottom: 5px;
  position: relative;

  img {
    position: relative;
    width: 80px;
    height: 40px;
  }
  h6 {
    position: absolute;
    bottom: 10px;
  }
`;
function SmallMiddleArrow({ text }) {
  return (
    <>
      <MiddleArrowWrapper>
        {text === "" ? (
          <img src={arrow} alt="arrow" />
        ) : (
          <>
            <Typography variant="subtitle1" color="textSecondary">
              {text}
            </Typography>
            <img src={arrow} alt="arrow" />
          </>
        )}
      </MiddleArrowWrapper>
    </>
  );
}

export default SmallMiddleArrow;
