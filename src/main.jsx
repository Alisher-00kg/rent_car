import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./store";
import App from "./App";
import { ToastContainer } from "react-toastify";
import { FavoriteProvider } from "./context/FavoriteContext";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <FavoriteProvider>
        <ToastContainer />
        <App />
      </FavoriteProvider>
    </Provider>
  </React.StrictMode>
);
