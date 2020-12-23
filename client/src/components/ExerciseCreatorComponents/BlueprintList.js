import React, { useContext, useEffect } from "react";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";

import { ExerciseCreatorContext } from "../../context/exerciseCreator/exerciseCreatorState";

function BlueprintsList() {
  const exerciseCreatorContext = useContext(ExerciseCreatorContext);
  const {
    blueprints,
    setCurrentBlueprintFromList,
    currentBlueprint,
    getBlueprintsFromAPI,
  } = exerciseCreatorContext;
  useEffect(() => {
    setCurrentBlueprintFromList("0");
    getBlueprintsFromAPI();
  }, []);
  return (
    <>
      <InputLabel id="demo-mutiple-name-label">Nazwa blueprinttu</InputLabel>
      <Select
        labelId="demo-mutiple-name-label"
        value={currentBlueprint.name === undefined ? "0" : currentBlueprint._id}
        onChange={(e) => setCurrentBlueprintFromList(e.target.value)}
      >
        <MenuItem value="0" key="0">
          <em>Nie no, najpierw wybierz blueprintt ziom</em>
        </MenuItem>
        {blueprints.map((blueprint, index) => (
          <MenuItem value={blueprint._id} key={index + 1}>
            {blueprint.name}
          </MenuItem>
        ))}
      </Select>
    </>
  );
}

export default BlueprintsList;
