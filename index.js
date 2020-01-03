import React from "react";
import ReactDOM from "react-dom";
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
  }
});

ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <App />
  </MuiThemeProvider>,
  document.getElementById("app")
);
