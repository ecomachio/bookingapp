import { beforeEach, describe, expect, it, vi } from "vitest";
import {
  render,
  fireEvent,
} from "@testing-library/react";
import { Bookings } from "..";
import * as useBookings from "../../../hooks/useBookings";

import "@testing-library/jest-dom/vitest";

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
    render(<Bookings />);
  });

  it("displays the bookings", () => {
    const { getByText } = render(<Bookings />);
    expect(getByText("Test Property")).toBeInTheDocument();
    expect(getByText("Test Location")).toBeInTheDocument();
  });

  it("opens the edit modal when the edit button is clicked", async () => {
    const { getByText, getByLabelText } = render(<Bookings />);

    const editButton = getByLabelText("Edit", { selector: "button" });
    expect(editButton).toBeInTheDocument();

    fireEvent.click(editButton);

    expect(getByText(/Save/)).toBeInTheDocument();
  });

  it("opens the delete modal when the delete button is clicked", async () => {
    const { getByText, getByLabelText } = render(<Bookings />);
    const deleteButton = getByLabelText("Delete", { selector: "button" });

    fireEvent.click(deleteButton);

    expect(
      getByText("Are you sure you want to delete this booking?")
    ).toBeInTheDocument();
  });
});
