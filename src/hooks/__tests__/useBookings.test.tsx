/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, expect, it } from "vitest";
import { renderHook } from "@testing-library/react-hooks";
import { AppContext } from "../../context/AppContext";
import useBookings from "../useBookings";

describe("useBookings", () => {
  it("returns all bookings with their associated properties", () => {
    const properties = [
      {
        id: 1,
        name: "Property 1",
        price: 100,
        description: "Description 1",
        location: "Location 1",
        bookedDates: [
          { id: 1, startDate: "2022-01-01", endDate: "2022-01-10" },
          { id: 2, startDate: "2022-02-01", endDate: "2022-02-10" },
        ],
      },
      {
        id: 2,
        name: "Property 2",
        price: 200,
        description: "Description 2",
        location: "Location 2",
        bookedDates: [
          { id: 3, startDate: "2022-03-01", endDate: "2022-03-10" },
          { id: 4, startDate: "2022-04-01", endDate: "2022-04-10" },
        ],
      },
    ];

    const wrapper = ({ children }: any) => (
      <AppContext.Provider value={{ properties } as any}>
        {children}
      </AppContext.Provider>
    );

    const { result } = renderHook(() => useBookings(), { wrapper });

    expect(result.current.bookings).toHaveLength(4);
    expect(result.current.bookings[0].property).toEqual(properties[0]);
    expect(result.current.bookings[1].property).toEqual(properties[0]);
    expect(result.current.bookings[2].property).toEqual(properties[1]);
    expect(result.current.bookings[3].property).toEqual(properties[1]);
  });

  it("returns an empty array when there are no properties", () => {
    const properties = [] as any;

    const wrapper = ({ children }: any) => (
      <AppContext.Provider value={{ properties } as any}>
        {children}
      </AppContext.Provider>
    );

    const { result } = renderHook(() => useBookings(), { wrapper });

    expect(result.current.bookings).toEqual([]);
  });

  it("returns an empty array when properties exist but none have bookings", () => {
    const properties = [
      {
        id: 1,
        name: "Property 1",
        price: 100,
        description: "Description 1",
        location: "Location 1",
        bookedDates: [],
      },
      {
        id: 2,
        name: "Property 2",
        price: 200,
        description: "Description 2",
        location: "Location 2",
        bookedDates: [],
      },
    ];

    const wrapper = ({ children }: any) => (
      <AppContext.Provider value={{ properties } as any}>
        {children}
      </AppContext.Provider>
    );

    const { result } = renderHook(() => useBookings(), { wrapper });

    expect(result.current.bookings).toEqual([]);
  });

  it("returns only bookings from properties that have them", () => {
    const properties = [
      {
        id: 1,
        name: "Property 1",
        price: 100,
        description: "Description 1",
        location: "Location 1",
        bookedDates: [
          { id: 1, startDate: "2022-01-01", endDate: "2022-01-10" },
          { id: 2, startDate: "2022-02-01", endDate: "2022-02-10" },
        ],
      },
      {
        id: 2,
        name: "Property 2",
        price: 200,
        description: "Description 2",
        location: "Location 2",
        bookedDates: [],
      },
    ];

    const wrapper = ({ children }: any) => (
      <AppContext.Provider value={{ properties } as any}>
        {children}
      </AppContext.Provider>
    );

    const { result } = renderHook(() => useBookings(), { wrapper });

    expect(result.current.bookings).toHaveLength(2);
    expect(result.current.bookings[0].property).toEqual(properties[0]);
    expect(result.current.bookings[1].property).toEqual(properties[0]);
  });
});
