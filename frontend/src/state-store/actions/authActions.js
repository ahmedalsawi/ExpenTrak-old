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

import AuthAPIService from "services/AuthAPIService"


export const loadUser = () => async (dispatch, getState) => {

  const authAPI = new AuthAPIService();

  dispatch({
    type: USER_LOADING
  });

  const token = getState().authReducer.token;

  try {
    const data = await authAPI.loadUser(token);

    dispatch({
      type: USER_LOADED,
      payload: data
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR
    });
  }
};


export const login = (email, password) => async dispatch => {

  const authAPI = new AuthAPIService();

  try {
    const data = await authAPI.login({
      email,
      password
    })
    dispatch({
      type: LOGIN_SUCCESS,
      payload: data
    });
  } catch (err) {
    dispatch({
      type: LOGIN_FAIL
    });
  }


};


export const register = (userInfo) => async dispatch => {

  const authAPI = new AuthAPIService();

  try {
    const data = await authAPI.register(userInfo)
    dispatch({
      type: REGISTER_SUCCESS,
      payload: data
    });
  } catch (err) {
    dispatch({
      type: REGISTER_FAIL
    });
  }
};

export const logout = () => async (dispatch, getState) => {
  const authAPI = new AuthAPIService();

  try {
    await authAPI.logout()
    dispatch({
      type: LOGOUT_SUCCESS
    });
  } catch (err) {}
};