import {
  SET_CURRENT_BLUEPRINT,
  CLEAR_CURRENT_BLUEPRINT,
  SET_EXERCISE_FROM_BLUEPRINT,
  CHANGE_EXERCISE_LEFT,
  CHANGE_EXERCISE_RIGHT,
  CLEAR_CURRENT_EXERCISE,
  SET_EXERCISE_NAME,
  SET_EXERCISE_TOP,
  SET_CURRENT_BLUEPRINT_FROM_API,
  SET_CURRENT_TEST_EXERCISE,
  GET_BLUEPRINTS_FROM_API,
  GET_EXERCISE_FROM_API,
  GET_ALL_EXERCISES_FROM_API,
  DELETE_EXERCISES_FROM_API,
  DELETE_BLUEPRINT_FROM_API,
  POST_EXERCISE_TO_API,
  SET_ERROR,
  CLEAR_ERROR,
  CLEAR_ALL,
} from "../types.js";
export default (state, action) => {
  switch (action.type) {
    case POST_EXERCISE_TO_API:
      return {
        ...state,
      };
    case SET_CURRENT_BLUEPRINT_FROM_API:
      return {
        ...state,
        currentBlueprint: action.payload,
      };
    case GET_BLUEPRINTS_FROM_API:
      return {
        ...state,
        blueprints: action.payload,
      };
    case GET_EXERCISE_FROM_API:
      return {
        ...state,
        testExercise: {
          ...action.payload.exercise,
          id: action.payload._id,
        },
        currentBlueprint: action.payload.blueprint,
        doneExercises: [...state.doneExercises, action.payload._id],
      };
    case SET_CURRENT_TEST_EXERCISE:
      return {
        ...state,
        testExercise: action.payload,
      };

    case SET_CURRENT_BLUEPRINT:
      return {
        ...state,
        currentBlueprint: action.payload,
      };
    case CLEAR_CURRENT_BLUEPRINT:
      return {
        ...state,
        currentBlueprint: {},
      };
    case SET_EXERCISE_FROM_BLUEPRINT:
      return {
        ...state,
        currentExercise: action.payload,
      };
    case CHANGE_EXERCISE_LEFT:
      return {
        ...state,
        currentExercise: {
          ...state.currentExercise,
          leftSide: state.currentExercise.leftSide.map((obj) =>
            obj.index === action.payload.index ? action.payload : obj
          ),
        },
      };
    case CHANGE_EXERCISE_RIGHT:
      return {
        ...state,
        currentExercise: {
          ...state.currentExercise,
          rightSide: state.currentExercise.rightSide.map((obj) =>
            obj.index === action.payload.index ? action.payload : obj
          ),
        },
      };
    case CLEAR_CURRENT_EXERCISE:
      return {
        ...state,
        currentExercise: {
          ...state.currentExercise,
          rightSide: state.currentExercise.rightSide.map((obj) => {
            return { ...obj, ratio: "", value: "" };
          }),
          leftSide: state.currentExercise.leftSide.map((obj) => {
            return { ...obj, ratio: "", value: "" };
          }),
        },
      };
    case SET_EXERCISE_NAME:
      return {
        ...state,
        currentExercise: {
          ...state.currentExercise,
          name: action.payload,
        },
      };
    case SET_EXERCISE_TOP:
      return {
        ...state,
        currentExercise: {
          ...state.currentExercise,
          top: action.payload,
        },
      };
    case SET_ERROR:
      return {
        ...state,
        errors: [
          ...state.errors,
          { data: action.payload.data, severity: action.payload.severity },
        ],
      };
    case CLEAR_ERROR:
      return {
        ...state,
        errors: [],
      };
    case GET_ALL_EXERCISES_FROM_API:
      return {
        ...state,
        allExercises: [...action.payload],
      };
    case DELETE_EXERCISES_FROM_API:
      return {
        ...state,
        allExercises: state.allExercises.filter(
          (blob) => blob._id !== action.payload
        ),
      };
    case DELETE_BLUEPRINT_FROM_API:
      return {
        ...state,
        blueprints: state.blueprints.filter(
          (blob) => blob._id !== action.payload
        ),
      };
    case CLEAR_ALL:
      return {
        ...state,
        testExercise: {},
        currentBlueprint: {},
        blueprints: [],
        currentExercise: {},
        errors: [],
        doneExercises: [],
        allExercises: [],
      };
    default:
      return { ...state };
  }
};
