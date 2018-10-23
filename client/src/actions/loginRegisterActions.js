import axios from "axios";
import jwt_decode from "jwt-decode";
import setAuthToken from "../utils/setAuthToken";
import {
  GET_ERRORS,
  SET_CURRENT_USER,
  CLEAR_CURRENT_PROFILE
} from "../actions/types";

export const registerProfile = (profileData, history) => dispatch => {
  axios
    .post("/api/profile/register", profileData)
    .then(res => {
      history.push("/login");
    })
    .catch(err => {
      console.log("CATCH", err.response.data);
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data.data
      });
    });
};

export const loginProfile = profileData => dispatch => {
  axios
    .post("/api/profile/login", profileData)
    .then(res => {
      const { token } = res.data;

      localStorage.setItem("jwtToken", token);

      setAuthToken(token);

      const decoded = jwt_decode(token);

      dispatch(setCurrentUser(decoded));
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

export const logoutProfile = () => dispatch => {
  localStorage.removeItem("jwtToken");

  setAuthToken(false);

  dispatch(setCurrentUser({}));
};

export const clearCurrentProfile = () => {
  return {
    type: CLEAR_CURRENT_PROFILE
  };
};
