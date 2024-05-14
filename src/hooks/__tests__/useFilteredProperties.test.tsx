/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, expect, it } from "vitest";
import { renderHook } from "@testing-library/react-hooks";
import useFilteredProperties from "../../hooks/useFilteredProperties";
import { FILTER_OPTIONS } from "../../constants";

describe("useFilteredProperties", () => {
  it('returns all properties when the selected filter is "all"', () => {
    const properties = [
      { id: 1, categories: ["apartment"] },
      { id: 2, categories: ["mountain"] },
    ] as any;

    const { result } = renderHook(() =>
      useFilteredProperties(properties, FILTER_OPTIONS.all)
    );

    expect(result.current).toEqual(properties);
  });

  it("returns only properties that match the selected filter", () => {
    const properties = [
      { id: 1, categories: ["apartment"] },
      { id: 2, categories: ["mountain"] },
    ] as any;

    const { result } = renderHook(() =>
      useFilteredProperties(properties, FILTER_OPTIONS.apartment)
    );

    expect(result.current).toEqual([properties[0]]);
  });

  it("updates the filtered properties when the selected filter changes", () => {
    const properties = [
      { id: 1, categories: ["apartment"] },
      { id: 2, categories: ["cabin"] },
    ] as any;

    const { result, rerender } = renderHook(
      ({ filter }) => useFilteredProperties(properties, filter),
      { initialProps: { filter: FILTER_OPTIONS.all } }
    );

    expect(result.current).toEqual(properties);

    rerender({ filter: FILTER_OPTIONS.cabin });

    expect(result.current).toEqual([properties[1]]);
  });
});
