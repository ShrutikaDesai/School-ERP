import React from "react";
import ReactDOM from "react-dom/client";

import { ConfigProvider } from "antd";
import {
ThemeProvider,
CssBaseline
} from "@mui/material";

import App from "./App";
import adminTheme from "./theme/adminTheme";
import muiTheme from "./theme/muiTheme";

ReactDOM.createRoot(
document.getElementById("root")
).render(

<React.StrictMode>
  <ThemeProvider theme={muiTheme}>
    <CssBaseline />
    <ConfigProvider theme={adminTheme}>
      <App />
    </ConfigProvider>
  </ThemeProvider>
</React.StrictMode>

);