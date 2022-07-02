import { BrowserRouter } from "react-router-dom";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App";
import store from "./store/store";
// UI Material
import { ThemeProvider } from "@mui/material";
import { theme } from "./theme";
import "./index.scss";
import { AlertSnackbar } from "./components/alert";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

const container = document.getElementById("container");
const root = createRoot(container!);

root.render(
  <BrowserRouter>
    <Provider store={store}>
      {/*<LocalizationProvider dateAdapter={AdapterDateFns}>*/}
      <ThemeProvider theme={theme}>
        <AlertSnackbar />
          <App  />
      </ThemeProvider>
      {/*</LocalizationProvider>*/}
    </Provider>
  </BrowserRouter>
);
