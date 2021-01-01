import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import MiddleArrow from "../UniversalComponents/MiddleArrow";
import { ExerciseCreatorContext } from "../../context/exerciseCreator/exerciseCreatorState";
import RightSide from "./RightSide";
import LeftSide from "./LeftSide";

import { Button, Typography } from "@material-ui/core";
import ExerciseName from "./ExerciseName";
const ExerciseFormWrapper = styled.div`
  width: 90%;
  height: 100px;
  margin-top: 50px;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
`;
const ButtonWrapper = styled.div`
  width: 100%;
  height: 50px;
  margin-top: 25px;
  display: flex;
  button {
    margin-left: 15px;
  }
`;

function ExerciseCreatorForm() {
  //Using useContext hook to bring in global state
  const exerciseCreatorContext = useContext(ExerciseCreatorContext);
  //Destructuring methods from global context
  const {
    currentExercise,
    currentBlueprint,
    setExerciseFromBlueprint,
    getTestExerciseFromAPI,
    postTestExerciseToAPI,
  } = exerciseCreatorContext;

  useEffect(() => {
    setExerciseFromBlueprint(currentBlueprint);
  }, [currentBlueprint]);
  return (
    <ExerciseFormWrapper>
      {currentExercise.leftSide !== undefined &&
      currentExercise.rightSide !== undefined &&
      currentExercise.rightSide.length > 0 &&
      currentExercise.leftSide.length > 0 ? (
        <ExerciseName />
      ) : (
        <Typography variant="h4">
          Hello, click button below to get your first exercise!
        </Typography>
      )}
      <LeftSide />
      {currentBlueprint.leftSide > 0 && currentBlueprint.rightSide > 0 ? (
        <MiddleArrow top={currentBlueprint.top} />
      ) : null}
      <RightSide />
      <ButtonWrapper>
        <Button variant="contained" onClick={getTestExerciseFromAPI}>
          Get new exercise!
        </Button>
        {currentExercise.leftSide === undefined ||
        currentExercise.leftSide.length > 0 ? (
          <Button
            variant="contained"
            color="primary"
            onClick={() => postTestExerciseToAPI(currentExercise)}
          >
            Check!
          </Button>
        ) : null}
      </ButtonWrapper>
    </ExerciseFormWrapper>
  );
}

export default ExerciseCreatorForm;
