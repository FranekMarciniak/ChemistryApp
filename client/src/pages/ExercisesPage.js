import React, { useEffect, useContext } from "react";
import Wrapper from "../components/UniversalComponents/Wrapper";
import ExerciseTestForm from "../components/ExerciseComponents/ExerciseTestForm.js";
import { ExerciseCreatorContext } from "../context/exerciseCreator/exerciseCreatorState";
import AlertWidget from "../components/UniversalComponents/AlertWidget";
function ExercisesPage() {
  const exerciseCreatorContext = useContext(ExerciseCreatorContext);
  const { clearAll, errors } = exerciseCreatorContext;
  useEffect(() => {
    clearAll();
  }, []);
  return (
    <Wrapper>
      {errors.length > 0 ? <AlertWidget errors={errors} /> : null}
      <ExerciseTestForm />
    </Wrapper>
  );
}

export default ExercisesPage;
