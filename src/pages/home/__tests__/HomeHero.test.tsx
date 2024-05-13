import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { HomeHero } from "..";
import "@testing-library/jest-dom/vitest";
import { MemoryRouter } from "react-router-dom";

describe("HomeHero", () => {
  it("renders the title correctly", () => {
    render(
      <MemoryRouter>
        <HomeHero />
      </MemoryRouter>
    );
    const titleElement = screen.getByText(
      /Effortless Booking/i
    );
    expect(titleElement).toBeInTheDocument();
  });

  it("renders the description correctly", () => {
    render(
      <MemoryRouter>
        <HomeHero />
      </MemoryRouter>
    );
    const descriptionElement = screen.getByText(
      /Here you can find the best properties for your next vacation. Book now and enjoy your stay./i
    );
    expect(descriptionElement).toBeInTheDocument();
  });

  it("renders the button correctly", () => {
    render(
      <MemoryRouter>
        <HomeHero />
      </MemoryRouter>
    );
    const buttonElement = screen.getByText(/Explore our options/i);
    expect(buttonElement).toBeInTheDocument();
  });
});
