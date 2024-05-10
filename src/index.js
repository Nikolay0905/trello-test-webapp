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
      main: "#7734e7",
      light: "#cd79f5",
    },
    secondary: {
      main: "#0132fc",
      dark: "#010101",
      white: "#fffeff",
      grey: "#F0F3FF",
      zodiac: "#12375c",
      pink: "#f1a091",
      tia: "#cc4f0e",
      sinbad: "#94ced3",
    },
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
