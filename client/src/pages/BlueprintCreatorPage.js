import React, { useContext } from "react";
import Wrapper from "../components/UniversalComponents/Wrapper";
import BlueprintForm from "../components/BlueprintCreatorComponents/BlueprintForm";
import AlertWidget from "../components/UniversalComponents/AlertWidget";
import { BlueprintCreatorContext } from "../context/blueprintCreator/blueprintCreatorState";
import Alert from "@material-ui/lab/Alert";

function BlueprintCreator() {
  const blueprintCreatorContext = useContext(BlueprintCreatorContext);
  const { errors } = blueprintCreatorContext;
  return (
    <Wrapper>
      {errors.length > 0 ? <AlertWidget errors={errors} /> : null}
      <BlueprintForm />
    </Wrapper>
  );
}

export default BlueprintCreator;
