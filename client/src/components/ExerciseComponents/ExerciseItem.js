import React, { useState, useEffect, useContext } from "react";
import { TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import styled from "styled-components";
import PlusSign from "../UniversalComponents/PlusSign";
import { ExerciseCreatorContext } from "../../context/exerciseCreator/exerciseCreatorState";

const ExerciseItemWrapper = styled.div`
  width: 135px;
  display: flex;
`;
const useStyles = makeStyles(() => ({
  ratio: {
    width: "25px",
    marginRight: "8px",
  },
  value: {
    width: "110px",
  },
}));
function ExerciseItem({ last, side, index }) {
  const exerciseCreatorContext = useContext(ExerciseCreatorContext);
  const {
    updateExercise,
    currentBlueprint,
    currentExercise,
  } = exerciseCreatorContext;
  const [state, setState] = useState({
    ratio: "",
    value: "",
    index: index,
  });
  useEffect(() => {
    setState({
      ratio: "",
      value: "",
      index: index,
    });
  }, [currentBlueprint]);
  useEffect(() => {
    if (side === "leftSide") {
      updateExercise(state, "CHANGE_EXERCISE_LEFT");
    } else {
      updateExercise(state, "CHANGE_EXERCISE_RIGHT");
    }
  }, [state]);
  const classes = useStyles();

  const onChange = (e, w) => {
    if (w === "ratio") {
      setState({
        ...state,
        ratio: e.target.value,
      });
    } else {
      setState({
        ...state,
        value: e.target.value,
      });
    }
  };

  return (
    <ExerciseItemWrapper key="">
      <TextField
        className={classes.ratio}
        value={currentExercise[side][index].ratio}
        onChange={(e) => onChange(e, "ratio")}
      />
      <TextField
        className={classes.value}
        value={currentExercise[side][index].value}
        onChange={(e) => onChange(e, "data")}
      />
      {last === false ? <PlusSign /> : null}
    </ExerciseItemWrapper>
  );
}

export default ExerciseItem;
