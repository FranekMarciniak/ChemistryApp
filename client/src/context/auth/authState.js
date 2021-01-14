import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_ERRORS,
} from "../types.js";
import React, { useReducer, createContext } from "react";
import AuthReducer from "./authReducer";
import setTokenToLocalstorage from "../../util/setTokenToLocalstorage";
import Axios from "axios";
export const AuthContext = createContext();
const { Provider } = AuthContext;
function AuthState(props) {
  const initialState = {
    token: localStorage.getItem("token"),
    isAuthenticated: null,
    errors: [],
  };
  const [state, dispatch] = useReducer(AuthReducer, initialState);

  const loadUser = async () => {
    if (localStorage.token) {
      setTokenToLocalstorage(localStorage.token);
    }
    try {
      const res = await Axios.get("/api/users/login");
      dispatch({
        type: USER_LOADED,
        payload: res.data,
      });
    } catch (error) {
      // dispatch({
      //   type: AUTH_ERROR,
      //   payload: error,
      // });
      // setTimeout(
      //   () =>
      //     dispatch({
      //       type: CLEAR_ERRORS,
      //     }),
      //   3000
      // );
      console.log(error.response.data);
    }
  };

  const registerUser = async (data) => {
    const { name, email, password } = data;

    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    try {
      const res = await Axios.post(
        "/api/users/register",
        {
          login: name,
          email,
          password,
        },
        config
      );
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      });
      loadUser();
    } catch (error) {
      dispatch({
        type: REGISTER_FAIL,
        payload: { data: error.response.data.errors[0].msg, severity: "error" },
      });

      setTimeout(
        () =>
          dispatch({
            type: CLEAR_ERRORS,
          }),
        3000
      );
    }
  };

  const loginUser = async (data) => {
    const { email, password } = data;
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    try {
      const res = await Axios.post(
        "/api/users/login",
        {
          email,
          password,
        },
        config
      );
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });
      loadUser();
    } catch (error) {
      dispatch({
        type: LOGIN_FAIL,
        payload: { data: error.response.data.errors[0].msg, severity: "error" },
      });
      setTimeout(
        () =>
          dispatch({
            type: CLEAR_ERRORS,
          }),
        3000
      );
    }
  };
  //Logout user
  const logout = () => {
    dispatch({
      type: LOGOUT,
    });
  };

  //Clear errors
  const clearErrors = () => {
    dispatch({
      type: CLEAR_ERRORS,
    });
  };
  return (
    <Provider
      value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        errors: state.errors,
        registerUser,
        loginUser,
        logout,
        clearErrors,
        loadUser,
      }}
    >
      {props.children}
    </Provider>
  );
}

export default AuthState;
