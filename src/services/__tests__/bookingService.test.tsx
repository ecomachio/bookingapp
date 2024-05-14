/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, expect, it } from "vitest";
import "@testing-library/jest-dom/vitest";

import { BookingService } from "../bookingService";

describe("BookingService", () => {
  const properties = [
    {
      id: 1,
      bookedDates: [
        {
          id: 1,
          propertyId: 1,
          startDate: "2022-01-01",
          endDate: "2022-01-02",
        },
      ],
    },
    { id: 2, bookedDates: [] },
  ] as any;

  describe("add", () => {
    it("should add a booking to the correct property", () => {
      const booking = {
        id: 2,
        propertyId: 1,
        startDate: "2022-01-03",
        endDate: "2022-01-04",
      } as any;
      const updatedProperties = BookingService.add(properties, booking);
      expect(updatedProperties[0].bookedDates).toContainEqual(booking);
    });
  });

  describe("edit", () => {
    it("should edit a booking in the correct property", () => {
      const booking = {
        id: 1,
        propertyId: 1,
        startDate: "2022-01-05",
        endDate: "2022-01-06",
      } as any;
      const updatedProperties = BookingService.edit(properties, booking);
      expect(updatedProperties[0].bookedDates).toContainEqual(booking);
    });

    it("should throw an error if the property is not found", () => {
      const booking = {
        id: 1,
        propertyId: 3,
        startDate: "2022-01-05",
        endDate: "2022-01-06",
      } as any;
      expect(() => BookingService.edit(properties, booking)).toThrow(
        "Property not found"
      );
    });

    it("should throw an error if the booking is not found", () => {
      const booking = {
        id: 3,
        propertyId: 1,
        startDate: "2022-01-05",
        endDate: "2022-01-06",
      } as any;
      expect(() => BookingService.edit(properties, booking)).toThrow(
        "Booking not found"
      );
    });
  });

  describe("delete", () => {
    it("should delete a booking from the correct property", () => {
      const updatedProperties = BookingService.delete(properties, 1, 1);
      expect(updatedProperties[0].bookedDates).not.toContainEqual({
        id: 1,
        propertyId: 1,
        startDate: "2022-01-01",
        endDate: "2022-01-02",
      });
    });

    it("should throw an error if the property is not found", () => {
      expect(() => BookingService.delete(properties, 1, 3)).toThrow(
        "Property not found"
      );
    });
  });
});
