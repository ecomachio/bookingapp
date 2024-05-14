/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, expect, it, vi } from "vitest";
import { render, screen, fireEvent, act } from "@testing-library/react";
import { AppContext } from "../../../context/AppContext";
import { BookingForm } from "../BookingForm";
import { MemoryRouter, BrowserRouter as Router } from "react-router-dom";
import "@testing-library/jest-dom/vitest";
import { DEFAULT_DATE_VALIDATION_MESSAGE } from "../../../constants";

describe("BookingForm", () => {
  it("renders the form fields", () => {
    const mockProperty = {
      id: 1,
      name: "Property 1",
      location: "Location 1",
      price: 500,
    } as any;

    const wrapper = ({ children }: any) => (
      <AppContext.Provider
        value={{ addBooking: vi.fn(), editBooking: vi.fn() } as any}
      >
        <MemoryRouter
          initialEntries={["/bookings/add/2?start=2024-05-06&end=2024-05-09"]}
        >
          {children}
        </MemoryRouter>
      </AppContext.Provider>
    );

    render(<BookingForm property={mockProperty} mode="add" />, { wrapper });

    expect(screen.getByText("Dates")).toBeInTheDocument();
    expect(screen.getByText("Price")).toBeInTheDocument();
    expect(screen.getByText("Total")).toBeInTheDocument();
    expect(screen.getByText("May 6 - May 9")).toBeInTheDocument();
    expect(screen.getByText("$500.00 per night")).toBeInTheDocument();
    expect(screen.getByText("$2,000.00")).toBeInTheDocument();
  });

  it("populates the form fields when a booking is provided in edit mode", () => {
    const mockProperty = {
      id: 1,
      name: "Property 1",
      location: "Location 1",
      price: 500,
    } as any;

    const mockBooking = {
      id: 1,
      propertyId: 1,
      startDate: "2022-01-01",
      endDate: "2022-01-10",
    } as any;

    const wrapper = ({ children }: any) => (
      <AppContext.Provider
        value={{ addBooking: vi.fn(), editBooking: vi.fn() } as any}
      >
        <Router>{children}</Router>
      </AppContext.Provider>
    );

    render(
      <BookingForm property={mockProperty} booking={mockBooking} mode="edit" />,
      { wrapper }
    );

    expect(screen.getByText("Jan 1 - Jan 10")).toBeInTheDocument();
    expect(screen.getByText("Save changes")).toBeInTheDocument();
  });

  it("calls addBooking when the form is submitted in add mode", async () => {
    const mockProperty = {
      id: 1,
      name: "Property 1",
      location: "Location 1",
      price: 500,
    } as any;

    const addBookingSpy = vi.fn();

    const wrapper = ({ children }: any) => (
      <AppContext.Provider value={{ addBooking: addBookingSpy } as any}>
        <MemoryRouter
          initialEntries={["/bookings/add/2?start=2024-05-06&end=2024-05-09"]}
        >
          {children}
        </MemoryRouter>
      </AppContext.Provider>
    );

    render(<BookingForm property={mockProperty} mode="add" />, { wrapper });
    await act(() => {
      fireEvent.click(screen.getByText("Confirm booking"));
    });

    expect(addBookingSpy).toHaveBeenCalled();
  });

  it("calls editBooking when the form is submitted in edit mode", async () => {
    const mockProperty = {
      id: 1,
      name: "Property 1",
      location: "Location 1",
    } as any;

    const mockBooking = {
      id: 1,
      property: mockProperty,
      startDate: "2022-01-01",
      endDate: "2022-01-10",
    } as any;

    const mockEditBooking = vi.fn();

    const wrapper = ({ children }: any) => (
      <AppContext.Provider
        value={{ addBooking: vi.fn(), editBooking: mockEditBooking } as any}
      >
        <Router>{children}</Router>
      </AppContext.Provider>
    );

    render(
      <BookingForm property={mockProperty} booking={mockBooking} mode="edit" />,
      { wrapper }
    );
    await act(() => {
      fireEvent.click(screen.getByText("Save changes"));
    });

    expect(mockEditBooking).toHaveBeenCalled();
  });
  it("shows an error message when the date range is not provided", async () => {
    const mockProperty = {
      id: 1,
      name: "Property 1",
      location: "Location 1",
      price: 500,
    } as any;

    const mockAddBooking = vi.fn();

    const wrapper = ({ children }: any) => (
      <AppContext.Provider value={{ addBooking: mockAddBooking } as any}>
        <MemoryRouter initialEntries={["/bookings/add/2?start=null&end=null"]}>
          {children}
        </MemoryRouter>
      </AppContext.Provider>
    );

    render(<BookingForm property={mockProperty} mode="add" />, { wrapper });
    await act(() => {
      fireEvent.click(screen.getByText("Confirm booking"));
    });

    expect(
      screen.getByText(DEFAULT_DATE_VALIDATION_MESSAGE)
    ).toBeInTheDocument();
  });

  it("shows an error message when the date range is invalid", async () => {
    const mockProperty = {
      id: 1,
      name: "Property 1",
      location: "Location 1",
      price: 500,
    } as any;

    const mockAddBooking = vi.fn();

    const wrapper = ({ children }: any) => (
      <AppContext.Provider
        value={{ addBooking: mockAddBooking, editBooking: vi.fn() } as any}
      >
        <MemoryRouter initialEntries={["/bookings/add/2?start=null&end=null"]}>
          {children}
        </MemoryRouter>
      </AppContext.Provider>
    );

    render(<BookingForm property={mockProperty} mode="add" />, { wrapper });

    await act(() => {
      fireEvent.click(screen.getByText("Confirm booking"));
    });
    expect(
      screen.getByText(DEFAULT_DATE_VALIDATION_MESSAGE)
    ).toBeInTheDocument();
  });
});
