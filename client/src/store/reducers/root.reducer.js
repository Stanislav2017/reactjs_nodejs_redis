import { authReducer } from "./auth.reducer";
import { alertReducer } from "./alert.reducer";
import { combineReducers } from "redux";

export const rootReducer = combineReducers({
  authState: authReducer,
  alertState: alertReducer,
});
