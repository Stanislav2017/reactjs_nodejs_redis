import thunk from "redux-thunk";
import { applyMiddleware, createStore } from "redux";
import { rootReducer } from "./reducers/root.reducer";

const middlewares = [thunk];
const store = createStore(rootReducer, applyMiddleware(...middlewares));

export default store;
