import {
  SET_BLUEPRINT_NAME,
  SET_BLUEPRINT_LEFT,
  SET_BLUEPRINT_RIGHT,
  SET_BLUEPRINT_TOP,
  POST_BLUEPRINT_TO_API,
  SET_ERROR,
  CLEAR_ERROR,
} from "../types.js";
import React, { useReducer, createContext } from "react";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import BlueprintCreatorReducer from "./blueprintCreatorReducer";
export const BlueprintCreatorContext = createContext();
const { Provider } = BlueprintCreatorContext;
function BlueprintCreatorState(props) {
  const initialState = {
    name: "",
    leftSide: 0,
    rightSide: 0,
    top: false,
    errors: [],
  };
  const [state, dispatch] = useReducer(BlueprintCreatorReducer, initialState);
  const postBlueprintToAPI = () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    if (state.name === "") {
      dispatch({
        type: SET_ERROR,
        payload: { data: "Blueprint should have name", severity: "warning" },
      });
      setTimeout(() => dispatch({ type: CLEAR_ERROR }), 3500);
      return;
    }
    if (
      state.leftSide <= 0 ||
      isNaN(state.leftSide) === true ||
      state.rightSide <= 0 ||
      isNaN(state.rightSide) === true
    ) {
      dispatch({
        type: SET_ERROR,
        payload: {
          data: "Blueprint should have at least one product and one substrate",
          severity: "warning",
        },
      });
      setTimeout(() => dispatch({ type: CLEAR_ERROR }), 3500);
      return;
    }
    try {
      const id = uuidv4();
      axios.post(
        "/api/blueprints",
        {
          name: state.name,
          leftSide: state.leftSide,
          rightSide: state.rightSide,
          top: state.top,
          id,
          user: 1,
        },
        config
      );
      dispatch({ type: POST_BLUEPRINT_TO_API });
    } catch (error) {
      console.error(error);
    }
  };
  const setBlueprintName = (data) => {
    dispatch({ type: SET_BLUEPRINT_NAME, payload: data });
  };
  const setBlueprintLeft = (data) => {
    dispatch({ type: SET_BLUEPRINT_LEFT, payload: data });
  };
  const setBlueprintRight = (data) => {
    dispatch({ type: SET_BLUEPRINT_RIGHT, payload: data });
  };
  const setBlueprintTop = (data) => {
    dispatch({ type: SET_BLUEPRINT_TOP, payload: data });
  };
  return (
    <Provider
      value={{
        setBlueprintLeft,
        setBlueprintName,
        setBlueprintRight,
        setBlueprintTop,
        postBlueprintToAPI,
        errors: state.errors,
        state,
      }}
    >
      {props.children}
    </Provider>
  );
}

export default BlueprintCreatorState;
