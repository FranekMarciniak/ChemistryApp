import React, { useContext } from "react";
import arrow from "../../assets/method-draw-image.svg";
import styled from "styled-components";
import { makeStyles, TextField } from "@material-ui/core";
import { ExerciseCreatorContext } from "../../context/exerciseCreator/exerciseCreatorState";

const useStyles = makeStyles({
  root: {
    position: "relative",
  },
  img: {
    position: "relative",
  },
  textField: {
    position: "absolute",
    width: "55px",
    zIndex: "3",
    left: "5px",
  },
});
const MiddleArrowWrapper = styled.div`
  display: flex;
  width: 126px;
  margin-right: 16px;
  margin-left: 8px;
  img {
    width: 110px;
    height: 75px;
  }
  @media (max-width: 900px) {
    width: 90%;
  }
`;
function MiddleArrow({ top }) {
  const exerciseCreatorContext = useContext(ExerciseCreatorContext);
  const { setExerciseTop, currentExercise } = exerciseCreatorContext;
  const classes = useStyles();
  return (
    <MiddleArrowWrapper className={classes.root}>
      {top === true ? (
        <TextField
          className={classes.textField}
          value={currentExercise.top}
          onChange={(e) => setExerciseTop(e.target.value)}
        />
      ) : null}
      <img src={arrow} alt="arrow" className={classes.img} />
    </MiddleArrowWrapper>
  );
}

export default MiddleArrow;
