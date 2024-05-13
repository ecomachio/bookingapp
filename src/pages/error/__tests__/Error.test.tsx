import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import { MemoryRouter } from "react-router-dom";
import { Error } from "..";

describe("Error", () => {
  it("renders the default error message correctly", () => {
    render(
      <MemoryRouter>
        <Error />
      </MemoryRouter>
    );
    const messageElement = screen.getByText(/Ooops!/i);
    expect(messageElement).toBeInTheDocument();
  });

  it("renders the custom error message correctly", () => {
    const customMessage = "Custom error message";
    render(
      <MemoryRouter>
        <Error message={customMessage} />
      </MemoryRouter>
    );
    const messageElement = screen.getByText(customMessage);
    expect(messageElement).toBeInTheDocument();
  });

  it("renders the contact link correctly", () => {
    render(
      <MemoryRouter>
        <Error />
      </MemoryRouter>
    );
    const linkElement = screen.getByText(/github.com\/ecomachio/i);
    expect(linkElement).toBeInTheDocument();
  });
});
