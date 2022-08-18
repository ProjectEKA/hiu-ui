import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import DateFnsUtils from "@date-io/date-fns";
import store from "./src/redux/store";
import "@material-ui/core";
import "@material-ui/icons";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core";
import { StylesProvider } from '@material-ui/styles';
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import { teal } from "@material-ui/core/colors";
// main app
import App from "./src/App";
import Config from "./src/Config";

const theme = createMuiTheme({
  palette: {
    primary: teal,
    secondary: teal
  },
  typography: {
    fontFamily: '"Roboto", sans-serif',
    body1: {
      fontWeight: 300
    },
    h6: {
      fontSize: 16
    }
  }
});

document.querySelector('title').innerHTML= Config.TITLE;

ReactDOM.render(
  <Provider store={store}>
    <StylesProvider injectFirst>
      <MuiThemeProvider theme={theme}>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <App />
        </MuiPickersUtilsProvider>
      </MuiThemeProvider>
    </StylesProvider>
  </Provider>,
  document.getElementById("app")
);
