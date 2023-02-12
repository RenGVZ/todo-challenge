import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './app'
import { HelmetProvider } from "react-helmet-async";
import "./globals.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Details from "./Details.jsx";
import { todosLoader, detailsLoader } from "./api.js";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    loader: todosLoader,
  },
  {
    path: "details/:id",
    element: <Details />,
    loader: detailsLoader
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HelmetProvider>
      <RouterProvider router={router} />
    </HelmetProvider>
  </React.StrictMode>,
);
