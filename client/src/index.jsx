import React from "react";
import ReactDOM from "react-dom/client";
import "./style.css";
import App from "./App";

// Grab the HTML element where our React app will live
const rootElement = document.getElementById("root");

// Create a root container so React knows where to render the app
const reactRoot = ReactDOM.createRoot(rootElement);

// Render the App component into the page
// React.StrictMode is turned on to help catch potential issues during development
reactRoot.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
