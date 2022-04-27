import React from "react";
import "./index.scss";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import store from "./store/store";
import { ThemeProvider } from "@mui/material";
import { theme } from "./theme";

const container = document.getElementById("container");
const root = createRoot(container!);

root.render(
  <BrowserRouter>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </Provider>
  </BrowserRouter>
);
