import { SIGNIN, SIGNUP, LOGOUT, REFRESH } from "../types/auth.types";

const initialState = {
  user: null,
  accessToken: localStorage.getItem("payload"),
  isAuth: false,
};
const handlers = {
  DEFAULT: (state) => state,
  [SIGNIN]: signinHandler,
  [SIGNUP]: signupHandler,
  [LOGOUT]: logoutHandler,
  [REFRESH]: refreshHandler,
};

export const authReducer = (state = initialState, action) => {
  const handler = handlers[action.type] || handlers.DEFAULT;
  return handler(state, action);
};

function signinHandler(state, action) {
  const { user, accessToken } = action.payload;
  return { ...state, user, accessToken, isAuth: true };
}

function signupHandler(state, action) {
  const { user, accessToken } = action.payload;
  return { ...state, user, accessToken };
}

function logoutHandler(state) {
  return { ...state, user: null, accessToken: null };
}

function refreshHandler(state, action) {
  const { user, accessToken } = action.payload;
  return { ...state, user, accessToken };
}
