import React from "react";
import ReactDOM from "react-dom/client";
import { ConfigProvider } from "antd";
import App from "./App";
import adminTheme from "./theme/adminTheme";

ReactDOM.createRoot(document.getElementById("root")).render(
  <ConfigProvider theme={adminTheme}>
    <App />
  </ConfigProvider>
);