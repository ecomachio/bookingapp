/* eslint-disable @typescript-eslint/no-explicit-any */
import { beforeEach, describe, expect, it, vi } from "vitest";
import { render, fireEvent } from "@testing-library/react";
import { BookingList } from "..";
import * as useBookings from "../../../hooks/useBookings";

import "@testing-library/jest-dom/vitest";
import { AppContext } from "../../../context/AppContext";
import { MemoryRouter, Router } from "react-router-dom";
import { createMemoryHistory } from "history";

vi.mock("../../hooks/useBookings");

describe("Bookings", () => {
  const useBookingsSpy = vi.spyOn(useBookings, "default");
  beforeEach(() => {
    useBookingsSpy.mockReturnValue({
      bookings: [
        {
          id: 1,
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
            location: "Test Location",
            price: 1000,
            rooms: 4,
          },
          propertyId: 1,
          startDate: new Date(),
          endDate: new Date(),
        },
      ],
    });
  });

  it("renders without crashing", () => {
    const properties = [] as any;
    const wrapper = ({ children }: any) => (
      <AppContext.Provider value={{ properties } as any}>
        {children}
      </AppContext.Provider>
    );
    render(
      <MemoryRouter>
        <BookingList />
      </MemoryRouter>,
      { wrapper }
    );
  });

  it("displays the bookings", () => {
    const properties = [] as any;
    const wrapper = ({ children }: any) => (
      <AppContext.Provider value={{ properties } as any}>
        {children}
      </AppContext.Provider>
    );
    const { getByText } = render(
      <MemoryRouter>
        <BookingList />
      </MemoryRouter>,
      { wrapper }
    );
    expect(getByText("Test Property")).toBeInTheDocument();
    expect(getByText("Test Location")).toBeInTheDocument();
  });

  it("opens the delete modal when the delete button is clicked", async () => {
    const properties = [] as any;
    const wrapper = ({ children }: any) => (
      <AppContext.Provider value={{ properties } as any}>
        {children}
      </AppContext.Provider>
    );
    const { getByText, getByLabelText } = render(
      <MemoryRouter>
        <BookingList />
      </MemoryRouter>,
      { wrapper }
    );
    const deleteButton = getByLabelText("Delete", { selector: "button" });

    fireEvent.click(deleteButton);

    expect(
      getByText("Are you sure you want to delete this booking?")
    ).toBeInTheDocument();
  });

  it("navigates to the edit page when the edit button is clicked", () => {
    const history = createMemoryHistory();

    // mock push function
    history.push = vi.fn();

    const mockBookings = [
      {
        id: 1,
        property: { id: 1, name: "Property 1", location: "Location 1" },
        startDate: "2022-01-01",
        endDate: "2022-01-10",
      },
    ];

    const properties = [] as any;
    const wrapper = ({ children }: any) => (
      <AppContext.Provider value={{ properties } as any}>
        {children}
      </AppContext.Provider>
    );
    const { getByLabelText } = render(
      <Router location={history.location} navigator={history}>
        <BookingList />
      </Router>,
      { wrapper }
    );

    fireEvent.click(getByLabelText("Edit"));

    expect(history.push).toHaveBeenCalledWith(
      {
        hash: "",
        pathname: `/bookings/${mockBookings[0].id}/${mockBookings[0].property.id}`,
        search: "",
      },
      undefined,
      {
        preventScrollReset: undefined,
        relative: undefined,
        replace: false,
        state: undefined,
        unstable_viewTransition: undefined,
      }
    );
  });
});
