import { SIGNIN, SIGNUP, LOGOUT, LOADING } from "../types/auth.types";

const initialState = {
  user: null,
  accessToken: null,
  isAuth: false,
  loading: false,
};

const handlers = {
  DEFAULT: (state) => state,
  [SIGNIN]: signinHandler,
  [SIGNUP]: signupHandler,
  [LOGOUT]: logoutHandler,
  [LOADING]: (state, action) => ({ ...state, loading: action.isLoading }),
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
  return { ...state, user, accessToken, isAuth: true };
}

function logoutHandler(state) {
  return { ...state, user: null, accessToken: null, isAuth: false };
}
