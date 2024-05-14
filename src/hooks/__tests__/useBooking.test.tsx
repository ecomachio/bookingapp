/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, expect, it } from "vitest";
import { renderHook } from "@testing-library/react-hooks";
import { AppContext } from "../../context/AppContext";
import useBooking from "../useBooking";

describe("useBooking", () => {
  const properties = [
    {
      id: 1,
      bookedDates: [
        { id: 1, startDate: "2022-01-01", endDate: "2022-01-10" },
        { id: 2, startDate: "2022-02-01", endDate: "2022-02-10" },
      ],
    },
    {
      id: 2,
      bookedDates: [
        { id: 3, startDate: "2022-03-01", endDate: "2022-03-10" },
        { id: 4, startDate: "2022-04-01", endDate: "2022-04-10" },
      ],
    },
  ];
  it("returns the correct property and booking", () => {
    const wrapper = ({ children }: any) => (
      <AppContext.Provider value={{ properties } as any}>
        {children}
      </AppContext.Provider>
    );

    const { result } = renderHook(() => useBooking(1, 2), { wrapper });

    expect(result.current.property).toEqual(properties[0]);
    expect(result.current.booking).toEqual(properties[0].bookedDates[1]);
  });
  it("returns undefined when the property ID does not exist", () => {
    const wrapper = ({ children }: any) => (
      <AppContext.Provider value={{ properties } as any}>
        {children}
      </AppContext.Provider>
    );

    const { result } = renderHook(() => useBooking(999, 2), { wrapper });

    expect(result.current.property).toBeUndefined();
    expect(result.current.booking).toBeUndefined();
  });

  it("returns undefined when the booking ID does not exist", () => {
    const wrapper = ({ children }: any) => (
      <AppContext.Provider value={{ properties } as any}>
        {children}
      </AppContext.Provider>
    );

    const { result } = renderHook(() => useBooking(1, 999), { wrapper });

    expect(result.current.property).toEqual(properties[0]);
    expect(result.current.booking).toBeUndefined();
  });

  it("returns undefined when the properties array is empty", () => {
    const properties = [] as any;

    const wrapper = ({ children }: any) => (
      <AppContext.Provider value={{ properties } as any}>
        {children}
      </AppContext.Provider>
    );

    const { result } = renderHook(() => useBooking(1, 2), { wrapper });

    expect(result.current.property).toBeUndefined();
    expect(result.current.booking).toBeUndefined();
  });
});
