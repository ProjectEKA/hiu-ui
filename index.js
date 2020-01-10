import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "./src/redux/store";
import "@material-ui/core";
import "@material-ui/icons";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core";
import { teal } from "@material-ui/core/colors";
// main app
import App from "./src/App";

const theme = createMuiTheme({
  palette: {
    primary: teal,
    secondary: teal
  },
  typography: {
    fontFamily: '"Roboto", sans-serif'
  }
});

ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider theme={theme}>
      <App />
    </MuiThemeProvider>
  </Provider>,
  document.getElementById("app")
);
