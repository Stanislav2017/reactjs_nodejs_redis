import { SHOW_ALERT, HIDE_ALERT } from "../types/alert.types";
const initialState = {
  type: null,
  message: null,
  errors: null,
};
const handlers = {
  DEFAULT: (state) => state,
  [SHOW_ALERT]: (state, payload) => ({
    ...state,
    message: payload.message || "Something wrong!",
  }),
  [HIDE_ALERT]: (state) => ({ ...state, message: null }),
};

export const alertReducer = (state = initialState, action) => {
  const handler = handlers[action.type] || handlers.DEFAULT;
  return handler(state, action);
};
