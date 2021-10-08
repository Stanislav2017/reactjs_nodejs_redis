import "./App.css";
import "bootstrap/dist/css/bootstrap.css";

import React from "react";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routers/routes";
import { Provider } from "react-redux";
import store from "./store/store";

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="App">
          <AppRoutes />
        </div>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
