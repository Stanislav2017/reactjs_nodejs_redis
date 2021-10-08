import axios from "axios";
import { logout, signin, signup } from "../store/actions/auth.actions";
import apiAxiosInstance from "../http/index";

const baseURL = "http://localhost:5000/api/auth";

export const autoSigninService = () => {
  return async function (dispatch) {
    try {
      const resp = await apiAxiosInstance.get("/check_auth");
      const { accessToken, user } = resp.data;
      dispatch(signin({ payload: { accessToken, user } }));
    } catch (e) {
      console.log(e);
    }
  };
};

export const signinService = (data) => {
  return async function (dispatch) {
    try {
      const resp = await axios.post(`${baseURL}/signin`, data);
      const { accessToken, user } = resp.data;
      localStorage.setItem(
        "payload",
        JSON.stringify({ userId: user.id, rememberme: true })
      );
      dispatch(signin({ payload: { accessToken, user } }));
    } catch (e) {
      console.log(e);
    }
  };
};

export const signupService = (data) => {
  return async function (dispatch) {
    try {
      const resp = await axios.post(`${baseURL}/signup`, data);
      const { accessToken, user } = resp.data;
      localStorage.setItem(
        "payload",
        JSON.stringify({ userId: user.id, rememberme: true })
      );
      dispatch(signup({ payload: { accessToken, user } }));
    } catch (e) {
      console.log(e);
    }
  };
};

export const logoutService = () => {
  return async function (dispatch) {
    try {
      await axios.post(`${baseURL}/logout`);
      localStorage.removeItem("payload");
      dispatch(logout());
    } catch (e) {
      console.log(e);
    }
  };
};
