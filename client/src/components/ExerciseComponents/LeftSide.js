import React, { useContext } from "react";
import styled from "styled-components";
import { ExerciseCreatorContext } from "../../context/exerciseCreator/exerciseCreatorState";
import ExerciseItem from "./ExerciseItem";

const LeftSideContainer = styled.div`
  height: 50px;
  display: flex;
`;
function LeftSide() {
  const exerciseCreatorContext = useContext(ExerciseCreatorContext);
  const { currentExercise } = exerciseCreatorContext;
  return (
    <LeftSideContainer>
      {currentExercise.leftSide !== undefined
        ? currentExercise.leftSide.map((obj, index) => (
            <ExerciseItem
              key={index}
              index={index}
              last={
                index === currentExercise.leftSide.length - 1 ? true : false
              }
              side="leftSide"
            />
          ))
        : null}
    </LeftSideContainer>
  );
}

export default LeftSide;
