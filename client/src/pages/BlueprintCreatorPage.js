import React, { useContext } from "react";
import Wrapper from "../components/UniversalComponents/Wrapper";
import BlueprintForm from "../components/BlueprintCreatorComponents/BlueprintForm";
import Alert from "../components/UniversalComponents/Alert";
import { BlueprintCreatorContext } from "../context/blueprintCreator/blueprintCreatorState";

function BlueprintCreator() {
  const blueprintCreatorContext = useContext(BlueprintCreatorContext);
  const { errors } = blueprintCreatorContext;
  return (
    <Wrapper>
      {errors.length > 0 ? <Alert data={errors} /> : null}
      <BlueprintForm />
    </Wrapper>
  );
}

export default BlueprintCreator;
