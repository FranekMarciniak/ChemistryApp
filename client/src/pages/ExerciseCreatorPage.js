import React, { useContext } from "react";
import Wrapper from "../components/UniversalComponents/Wrapper";
import ExerciseCreatorForm from "../components/ExerciseCreatorComponents/ExerciseCreatorForm";
import BlueprintList from "../components/ExerciseCreatorComponents/BlueprintList";
import Alert from "../components/UniversalComponents/Alert";
import { ExerciseCreatorContext } from "../context/exerciseCreator/exerciseCreatorState";

function ExerciseCreator() {
  const exerciseCreatorContext = useContext(ExerciseCreatorContext);
  const { errors } = exerciseCreatorContext;
  return (
    <Wrapper>
      {errors.length > 0 ? <Alert data={errors} /> : null}
      <BlueprintList />
      <ExerciseCreatorForm location="creator" />
    </Wrapper>
  );
}

export default ExerciseCreator;
