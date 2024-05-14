/* eslint-disable @typescript-eslint/no-explicit-any */
import { beforeAll, describe, expect, it, vi } from "vitest";
import { renderHook, act } from "@testing-library/react-hooks";
import { AppContext } from "../../context/AppContext";
import useProperties from "../../hooks/useProperties";
import { API } from "../../services/api";

import "@testing-library/jest-dom/vitest";
import { beforeEach } from "node:test";

describe("useProperties", () => {
  beforeAll(() => {
    vi.resetModules();
  });
  beforeEach(() => {
    vi.clearAllMocks();
  });
  it("fetches properties if they are not loaded", async () => {
    const properties = [] as any;
    const setProperties = vi.fn();
    const mockProperties = [{ id: 1 }, { id: 2 }];
    const getSpy = vi.spyOn(API, "get");
    getSpy.mockResolvedValue({ properties: mockProperties });

    const wrapper = ({ children }: any) => (
      <AppContext.Provider value={{ properties, setProperties } as any}>
        {children}
      </AppContext.Provider>
    );

    await act(async () => {
      renderHook(() => useProperties(), { wrapper });
    });

    expect(getSpy).toHaveBeenCalled();
    expect(setProperties).toHaveBeenCalledWith(mockProperties);
  });
  it.skip("does not fetch properties if they are already loaded", async () => {
    const properties = [{ id: 1 }, { id: 2 }] as any;
    const setProperties = vi.fn();

    const getSpy = vi.spyOn(API, "get");
    getSpy.mockResolvedValue({ properties: [] });

    const wrapper = ({ children }: any) => (
      <AppContext.Provider value={{ properties, setProperties } as any}>
        {children}
      </AppContext.Provider>
    );

    await act(async () => {
      renderHook(() => useProperties(), { wrapper });
    });

    expect(getSpy).toHaveBeenCalledTimes(0);
  });

  it("sets error if fetching properties fails", async () => {
    const properties = [] as any;
    const setProperties = vi.fn();
    const mockError = new Error("Failed to fetch properties");
    const getSpy = vi.spyOn(API, "get");
    getSpy.mockRejectedValue(mockError);

    const wrapper = ({ children }: any) => (
      <AppContext.Provider value={{ properties, setProperties } as any}>
        {children}
      </AppContext.Provider>
    );

    const { result, waitForNextUpdate } = renderHook(() => useProperties(), {
      wrapper,
    });

    await waitForNextUpdate();

    expect(result.current.error).toEqual(mockError);
  });
});
