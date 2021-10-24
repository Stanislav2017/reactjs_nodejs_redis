import "./App.css";
// import "bootstrap/dist/css/bootstrap.css";

import React, { useState } from "react";
import Navigation from "./components/navigation/Navigation.jsx";
import { Provider } from "react-redux";
import { autoSigninService } from "./services/auth.service";
import Loader from "react-loader-spinner";
import store from "./store/store";

if (localStorage.getItem("payload")) {
  store.dispatch(autoSigninService());
}

const App = () => {
  let [loading, setLoading] = useState(store.getState().authState.loading);
  store.subscribe(() => setLoading(store.getState().authState.loading));
  const loaderStyles = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100vh",
  };
  if (loading) {
    return (
      <div style={loaderStyles}>
        <Loader type="Circles" color="orange" height={120} width={120} />
      </div>
    );
  }
  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  );
};

export default App;
