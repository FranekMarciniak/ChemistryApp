import React, { useEffect, useContext } from "react";
import Wrapper from "../components/UniversalComponents/Wrapper";
import ExerciseTestForm from "../components/ExerciseComponents/ExerciseTestForm.js";
import { ExerciseCreatorContext } from "../context/exerciseCreator/exerciseCreatorState";
import Alert from "../components/UniversalComponents/Alert";

function ExercisesPage() {
  return (
    <Wrapper>
      <ExerciseTestForm />
    </Wrapper>
  );
}

export default ExercisesPage;
