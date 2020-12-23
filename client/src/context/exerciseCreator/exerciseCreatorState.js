import {
  SET_CURRENT_BLUEPRINT,
  CLEAR_CURRENT_BLUEPRINT,
  SET_EXERCISE_FROM_BLUEPRINT,
  CLEAR_CURRENT_EXERCISE,
  SET_EXERCISE_NAME,
  SET_EXERCISE_TOP,
  SET_CURRENT_BLUEPRINT_FROM_API,
  SET_CURRENT_TEST_EXERCISE,
  GET_BLUEPRINTS_FROM_API,
  GET_EXERCISE_FROM_API,
  POST_EXERCISE_TO_API,
  SET_ERROR,
  CLEAR_ERROR,
} from "../types.js";
import axios from "axios";
import React, { useReducer, createContext } from "react";
import ExerciseCreatorReducer from "./exerciseCreatorReducer";
export const ExerciseCreatorContext = createContext();
const { Provider } = ExerciseCreatorContext;
function ExerciseCreatorState(props) {
  const initialState = {
    testExercise: {},
    currentBlueprint: {},
    blueprints: [],
    currentExercise: {},
    errors: [],
    doneExercises: [],
  };
  const [state, dispatch] = useReducer(ExerciseCreatorReducer, initialState);
  const setCurrentBlueprintFromList = (id) => {
    if (id == "0") {
      dispatch({
        type: CLEAR_CURRENT_BLUEPRINT,
      });
    } else {
      dispatch({
        type: SET_CURRENT_BLUEPRINT,
        payload: state.blueprints.find((blueprint) => blueprint._id == id),
      });
    }
  };
  const clearCurrentBlueprint = () => {
    dispatch({
      type: CLEAR_CURRENT_BLUEPRINT,
    });
  };
  const setExerciseFromBlueprint = (data) => {
    const obj = {
      name: "",
      top: data.top === true ? "" : false,
      leftSide: Array(data.leftSide === undefined ? 0 : data.leftSide)
        .fill(null)
        .map((slot, index) => {
          return {
            ratio: "",
            value: "",
            index,
          };
        }),
      rightSide: Array(data.rightSide === undefined ? 0 : data.rightSide)
        .fill(null)
        .map((slot, index) => {
          return {
            ratio: "",
            value: "",
            index,
          };
        }),
    };

    dispatch({ type: SET_EXERCISE_FROM_BLUEPRINT, payload: obj });
  };
  const updateExercise = (data, type) => {
    dispatch({ type, payload: data });
  };
  const clearCurrentExercise = () => {
    if (state.currentExercise.rightSide !== undefined) {
      dispatch({ type: CLEAR_CURRENT_EXERCISE });
    }
  };
  const setExerciseName = (data) => {
    dispatch({ type: SET_EXERCISE_NAME, payload: data });
  };
  const setExerciseTop = (data) => {
    dispatch({ type: SET_EXERCISE_TOP, payload: data });
  };
  const setCurrentBlueprintFromAPI = (data) => {
    dispatch({
      type: SET_CURRENT_BLUEPRINT_FROM_API,
      payload: data,
    });
  };
  const setCurrentTestExercise = (data) => {
    dispatch({
      type: SET_CURRENT_TEST_EXERCISE,
      payload: data,
    });
  };
  const getBlueprintsFromAPI = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await axios.get("/api/blueprints", config);
      dispatch({ type: GET_BLUEPRINTS_FROM_API, payload: res.data });
    } catch (error) {
      console.log(error);
    }
  };
  const getTestExerciseFromAPI = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await axios.get("/api/test", config);
      dispatch({ type: GET_EXERCISE_FROM_API, payload: res.data });
    } catch (error) {
      console.log(error);
    }
  };
  const postTestExerciseFromAPI = (data) => {
    console.log(data);
  };
  const postExerciseToAPI = (data) => {
    let empty = false;
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    if (state.currentExercise.name === "") {
      dispatch({ type: SET_ERROR, payload: "Ustaw nazwę przykładu. " });
      setTimeout(() => dispatch({ type: CLEAR_ERROR }), 3500);
      return;
    }
    state.currentExercise.leftSide.forEach((blob) => {
      if (blob.value === "") {
        empty = true;
      }
    });
    state.currentExercise.rightSide.forEach((blob) => {
      if (blob.value === "") {
        empty = true;
      }
    });
    if (empty) {
      dispatch({
        type: SET_ERROR,
        payload: "Wszystkie pola oprócz wskaźników muszą być wypełnione. ",
      });
      setTimeout(() => dispatch({ type: CLEAR_ERROR }), 3500);
      return;
    }
    try {
      axios.post(
        "/api/exercises",
        {
          exercise: state.currentExercise,
          blueprint: state.currentBlueprint,
        },
        config
      );
      setExerciseFromBlueprint(state.currentBlueprint);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Provider
      value={{
        blueprints: state.blueprints,
        currentExercise: state.currentExercise,
        currentBlueprint: state.currentBlueprint,
        testExercise: state.testExercise,
        errors: state.errors,
        doneExercises: state.doneExercises,
        setCurrentBlueprintFromList,
        updateExercise,
        setExerciseFromBlueprint,
        clearCurrentExercise,
        setExerciseName,
        setExerciseTop,
        setCurrentBlueprintFromAPI,
        setCurrentTestExercise,
        clearCurrentBlueprint,
        getBlueprintsFromAPI,
        getTestExerciseFromAPI,
        postExerciseToAPI,
        postTestExerciseFromAPI,
      }}
    >
      {props.children}
    </Provider>
  );
}

export default ExerciseCreatorState;
