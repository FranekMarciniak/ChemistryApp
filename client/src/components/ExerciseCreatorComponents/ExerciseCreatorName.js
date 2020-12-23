import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import { ExerciseCreatorContext } from "../../context/exerciseCreator/exerciseCreatorState";
import { TextField } from "@material-ui/core";

const NameWrapper = styled.div`
  width: 100%;
  display: flex;
  height: 50px;
  flex-direction: column;
  margin-bottom: 30px;
  div {
    width: 50%;
  }
`;
function ExerciseName() {
  const exerciseCreatorContext = useContext(ExerciseCreatorContext);
  const { currentExercise, setExerciseName } = exerciseCreatorContext;
  return (
    <NameWrapper>
      <TextField
        required
        label="Nazwa przykładu"
        id="name"
        InputLabelProps={{
          shrink: true,
        }}
        value={currentExercise.name}
        onChange={(e) => setExerciseName(e.target.value)}
      />
    </NameWrapper>
  );
}

export default ExerciseName;
