import { describe, expect, it, vi } from "vitest";
import { render, fireEvent } from "@testing-library/react";
import { DateRangePicker } from "../DateRangePicker";
import { beforeEach } from "node:test";

import "@testing-library/jest-dom/vitest";

const month = new Date().toLocaleString("default", { month: "long" });
describe("DateRangePicker", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });
  it("should render without crashing", () => {
    const { getByText } = render(
      <DateRangePicker value={null} setValue={vi.fn()} />
    );
    expect(getByText(month)).toBeInTheDocument();
  });

  it("should call setValue when a date is selected", () => {
    const setValue = vi.fn();
    const { getByText, getAllByText } = render(
      <DateRangePicker value={null} setValue={setValue} />
    );
    const input = getByText(month);

    fireEvent.click(input);

    fireEvent.click(getAllByText("1")[0]);
    fireEvent.click(getAllByText("2")[0]);
    fireEvent.click(getByText("Apply"));

    expect(setValue).toHaveBeenCalledWith({
      startDate: new Date(2024, 5, 1).toISOString().split("T")[0],
      endDate: new Date(2024, 5, 2).toISOString().split("T")[0],
    });
  });
});
