import {
  SET_BLUEPRINT_NAME,
  SET_BLUEPRINT_LEFT,
  SET_BLUEPRINT_RIGHT,
  SET_BLUEPRINT_TOP,
  SET_BLUEPRINT_ERROR,
  CLEAR_BLUEPRINT_ERROR,
  POST_BLUEPRINT_TO_API,
  SET_ERROR,
  CLEAR_ERROR,
} from "../types.js";
export default (state, action) => {
  switch (action.type) {
    case SET_BLUEPRINT_NAME:
      return { ...state, name: action.payload };
    case SET_BLUEPRINT_LEFT:
      return { ...state, leftSide: parseInt(action.payload) };
    case SET_BLUEPRINT_RIGHT:
      return { ...state, rightSide: parseInt(action.payload) };
    case SET_BLUEPRINT_TOP:
      return { ...state, top: action.payload };
    case POST_BLUEPRINT_TO_API:
      return { name: "", leftSide: 0, rightSide: 0, top: false, errors: [] };
    case SET_ERROR:
      return {
        ...state,
        errors: [...state.errors, action.payload],
      };
    case CLEAR_ERROR:
      return {
        ...state,
        errors: [],
      };
    default:
      return { ...state };
  }
};
