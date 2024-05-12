import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Error from "./pages/error/Error.tsx";
import Property from "./pages/property/Property.tsx";
import App from "./App.tsx";
import { Home } from "./pages/home/index.ts";
import Confirmation from "./pages/confirmantion/Confirmation.tsx";
import Bookings from "./pages/bookings/Bookings.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "property/:id",
        element: <Property />,
      },
      {
        path: "property/:propertyId/confirmation/:bookingId",
        element: <Confirmation />,
      },
      {
        path: "bookings",
        element: <Bookings />,
      },
      {
        path: "404",
        element: <Error />,
      },
      {
        path: "*",
        element: <Error />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
