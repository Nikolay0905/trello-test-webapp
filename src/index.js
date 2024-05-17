import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";

import App from "./App";
import Dashboard from "./Pages/Dashboard";
import { BACKEND_URL } from "./constants";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import axios from "axios";

import "./index.css";

axios.defaults.baseURL = BACKEND_URL;

const theme = createTheme({
  palette: {
    primary: {
      main: "#373F26",
      light: "#cd79f5",
    },
    secondary: {
      main: "#D9F720",
      dark: "#010101",
      white: "#fffeff",
      grey: "#F0F3FF",
      zodiac: "#12375c",
      pink: "#f1a091",
      tia: "#cc4f0e",
      sinbad: "#94ced3",
    },
    interrupt: "#1e75b3",
    timeout: "#999799",
    pass: "#2ca02c",
    fail: "#d72828",
    cancel: "#ff7f0f",
  },
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
