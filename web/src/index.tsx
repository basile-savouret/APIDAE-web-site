import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#A5E9E1",
    },
    secondary: {
      main: '#388186',
    },
  },
  overrides: {
    MuiPaper: {
      elevation1: {
        boxShadow: "4px 4px 6px 1px rgba(0, 0, 0, 0.05)"
      }
    },
    MuiTypography: {
      body1: {
        fontSize: "14px",
        color: "#827D74"
      },
      body2: {
        fontSize: "13px",
        color: "rgba(130, 125, 116, 0.9)"
      }
    }
  }
});

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
