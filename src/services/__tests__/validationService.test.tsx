/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, expect, it } from "vitest";
import "@testing-library/jest-dom/vitest";

import {
  validateBookingForm,
  validateDateSelection,
} from "../validationService";
import { DEFAULT_DATE_VALIDATION_MESSAGE } from "../../constants";

describe("validateBookingForm", () => {
  it("should return invalid when date range is not provided", () => {
    const result = validateBookingForm({
      data: {
        dateRange: null,
      },
    } as any);
    expect(result.isValid).toBe(false);
    expect(result.message).toBe(DEFAULT_DATE_VALIDATION_MESSAGE);
  });

  it("should return invalid when property is not available", () => {
    const result = validateBookingForm({
      data: {
        dateRange: { startDate: "2022-01-01", endDate: "2022-01-02" },
      },
      property: {
        bookedDates: [
          {
            startDate: new Date("2022-01-01"),
            endDate: new Date("2022-01-02"),
            id: 1,
            propertyId: 1,
          },
        ],
      } as any,
    }) as any;

    expect(result.isValid).toBe(false);
    expect(result.message).toBe(
      "Property is not available for the selected dates"
    );
  });

  it("should return valid when property is available", () => {
    const result = validateBookingForm({
      data: {
        dateRange: { startDate: "2022-01-01", endDate: "2022-01-02" },
      },
      property: {
        bookedDates: [],
      } as any,
    });
    expect(result.isValid).toBe(true);
  });
});

describe("validateDateSelection", () => {
  it("should return invalid when start date or end date is not provided", () => {
    const result = validateDateSelection({ startDate: null, endDate: null });
    expect(result.isValid).toBe(false);
    expect(result.message).toBe(DEFAULT_DATE_VALIDATION_MESSAGE);
  });

  it("should return valid when start date and end date are provided", () => {
    const result = validateDateSelection({
      startDate: "2022-01-01",
      endDate: "2022-01-02",
    });
    expect(result.isValid).toBe(true);
  });
});
