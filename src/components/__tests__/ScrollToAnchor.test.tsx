import { describe, expect, it, vi } from "vitest";
import { render, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import ScrollToAnchor from "../ScrollToAnchor";
import { afterEach, beforeEach } from "node:test";

import "@testing-library/jest-dom/vitest";

describe("ScrollToAnchor", () => {
  beforeEach(() => {
    // This feels weird to do, given what it does:
    // https://sinonjs.org/releases/latest/fake-timers/#:~:text=config.-,shouldAdvanceTime
    vi.useFakeTimers({ shouldAdvanceTime: true });
  });

  afterEach(() => {
    vi.runOnlyPendingTimers();
    vi.useRealTimers();
  });
  it("should scroll to the element with the id from the hash", async () => {
    const scrollIntoViewMock = vi.fn();
    window.HTMLElement.prototype.scrollIntoView = scrollIntoViewMock;

    render(
      <MemoryRouter initialEntries={["/#test"]} initialIndex={0}>
        <ScrollToAnchor />
        <div id="test">Test</div>
      </MemoryRouter>
    );

    await waitFor(() => expect(scrollIntoViewMock).toHaveBeenCalled());
  });
});
