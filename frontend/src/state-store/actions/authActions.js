import axios from "axios";

import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL
} from "./actionTypes";


export const loadUser = () => (dispatch, getState) => {
  // User Loading
  dispatch({
    type: USER_LOADING
  });

  axios
    .get("/api/auth/user", tokenConfig(getState))
    .then(res => {
      dispatch({
        type: USER_LOADED,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: AUTH_ERROR
      });
    });
};


export const login = (email, password) => dispatch => {

  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  const body = JSON.stringify({
    email,
    password
  });

  axios
    .post("/api/auth/login", body, config)
    .then(res => {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: LOGIN_FAIL
      });
    });
};


export const register = (userInfo) => dispatch => {

  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  const body = JSON.stringify(
    userInfo
  );

  axios
    .post("/api/auth/register", body, config)
    .then(res => {
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: REGISTER_FAIL
      });
    });
};

// LOGOUT USER
export const logout = () => (dispatch, getState) => {
  // axios
  //   .post("/api/auth/logout/", null, tokenConfig(getState))
  //   .then(res => {
  //     dispatch({
  //       type: LOGOUT_SUCCESS
  //     });
  //   })
  //   .catch(err => {});
  dispatch({
    type: LOGOUT_SUCCESS
  });
};

// Setup config with token - helper function
export const tokenConfig = getState => {
  const token = getState().authReducer.token;

  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  if (token) {
    config.headers["Authorization"] = `Token ${token}`;
  }

  return config;
};