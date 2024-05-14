import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { useErrorBoundary } from "react-error-boundary";
import { Confirmation } from "..";

import { beforeEach, describe, expect, it, vi } from "vitest";

import "@testing-library/jest-dom/vitest";

import * as useBooking from "../../../hooks/useBooking";

vi.mock("react-error-boundary", () => ({
  useErrorBoundary: vi.fn(),
}));

describe("Confirmation", () => {
  const useBookingSpy = vi.spyOn(useBooking, "default");
  useBookingSpy.mockReturnValue({
    property: {
      id: 1,
      name: "Test Property",
      bathrooms: 3,
      bookedDates: [
        {
          id: 1,
          propertyId: 1,
          startDate: new Date(2022, 1, 1),
          endDate: new Date(2022, 1, 7),
        },
      ],
      capacity: 10,
      categories: ["house"],
      description: "A beautiful beach house",
      welcomeMessage:
        "Welcome to the Beach House! Enjoy the sun, sand, and sea.",
      image: "",
      secondaryImages: [],
      location: "Miami, FL",
      price: 1000,
      rooms: 4,
    },
    booking: {
      id: 1,
      propertyId: 1,
      startDate: new Date(2022, 1, 1),
      endDate: new Date(2022, 1, 7),
    },
  });

  beforeEach(() => {
    vi.mocked(useErrorBoundary).mockReturnValue({
      showBoundary: vi.fn(),
      resetBoundary: function (): void {
        throw new Error("Function not implemented.");
      },
    });
  });

  it("renders the confirmation message correctly", () => {
    render(
      <MemoryRouter initialEntries={["/confirmation/1/1"]}>
        <Routes>
          <Route
            path="/confirmation/:propertyId/:bookingId"
            element={<Confirmation />}
          />
        </Routes>
      </MemoryRouter>
    );
    const messageElement = screen.getByText(/Thank you for booking with us!/i);
    expect(messageElement).toBeInTheDocument();
  });

  it("renders the booking dates correctly", () => {
    render(
      <MemoryRouter initialEntries={["/confirmation/1/1"]}>
        <Routes>
          <Route
            path="/confirmation/:propertyId/:bookingId"
            element={<Confirmation />}
          />
        </Routes>
      </MemoryRouter>
    );
    const dateElement = screen.getByText(
      /From Feb 1 to Feb 7/i
    );
    expect(dateElement).toBeInTheDocument();
  });

  it("shows error boundary when booking or property is not found", () => {
    const spy = vi.spyOn(useErrorBoundary(), "showBoundary");
    useBookingSpy.mockReturnValue({
      property: undefined,
      booking: undefined,
    });
    render(
      <MemoryRouter initialEntries={["/confirmation/9/9"]}>
        <Routes>
          <Route
            path="/confirmation/:propertyId/:bookingId"
            element={<Confirmation />}
          />
        </Routes>
      </MemoryRouter>
    );

    expect(spy).toHaveBeenCalledWith(new Error("Booking not found"));
  });
});
