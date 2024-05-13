import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";
import { createHashRouter, RouterProvider } from "react-router-dom";

import Error from "./pages/error/Error.tsx";
import Property from "./pages/property/Property.tsx";
import App from "./App.tsx";
import { Home } from "./pages/home/index.ts";

import { Booking, BookingList, Bookings } from "./pages/bookings";
import Confirmation from "./pages/confirmantion/Confirmation.tsx";

const router = createHashRouter(
  [
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
          path: "bookings",
          element: <Bookings />,
          children: [
            {
              index: true,
              element: <BookingList />,
            },
            {
              path: ":propertyId/confirmation/:bookingId/",
              element: <Confirmation />,
            },
            {
              path: "add/:propertyId",
              element: <Booking />,
            },
            {
              path: ":bookingId/:propertyId",
              element: <Booking />,
            },
          ],
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
  ],
  {
    basename: import.meta.env.BASE_URL,
  }
);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
