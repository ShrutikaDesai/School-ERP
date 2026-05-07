import React from "react";
import ReactDOM from "react-dom/client";

import { ConfigProvider } from "antd";
import {
  ThemeProvider,
  CssBaseline
} from "@mui/material";

import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import App from "./App";
import adminTheme from "./theme/adminTheme";
import muiTheme from "./theme/muiTheme";

ReactDOM.createRoot(
  document.getElementById("root")
).render(

  <React.StrictMode>
    <ThemeProvider theme={muiTheme}>
      <CssBaseline />

      {/* 👇 ADD THIS */}
      <LocalizationProvider dateAdapter={AdapterDayjs}>

        <ConfigProvider theme={adminTheme}>
          <App />
        </ConfigProvider>

      </LocalizationProvider>

    </ThemeProvider>
  </React.StrictMode>

);