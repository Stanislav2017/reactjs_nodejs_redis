import "./App.css";
import "bootstrap/dist/css/bootstrap.css";

import React, { useState } from "react";
import AppRoutes from "./routers/index";
import { Provider } from "react-redux";
import { Router } from "react-router-dom";
import { createBrowserHistory } from "history";
import { autoSigninService } from "./services/auth.service";
import Loader from "react-loader-spinner";
import store from "./store/store";

if (localStorage.getItem("payload")) {
  store.dispatch(autoSigninService());
}

const App = () => {
  let [loading, setLoading] = useState(store.getState().authState.loading);
  store.subscribe(() => setLoading(store.getState().authState.loading));
  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: "100vh",
        }}
      >
        <Loader type="Circles" color="orange" height={120} width={120} />
      </div>
    );
  }
  return (
    <Provider store={store}>
      <div className="App">
        <Router history={createBrowserHistory()}>
          <AppRoutes />
        </Router>
      </div>
    </Provider>
  );
};

export default App;
