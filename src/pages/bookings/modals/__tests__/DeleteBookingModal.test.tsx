/* eslint-disable @typescript-eslint/no-explicit-any */
import { beforeEach, describe, expect, it, vi } from "vitest";
import { render, fireEvent, act } from "@testing-library/react";

import { DeleteBookingModal } from "../DeleteBookingModal";

import "@testing-library/jest-dom/vitest";
import { AppContext } from "../../../../context/AppContext";
import { MemoryRouter } from "react-router-dom";

describe("DeleteBookingModal", () => {
  const openModal: boolean = true;
  let setOpenModal = vi.fn();
  const action = vi.fn();
  const properties = [
    {
      id: 1,
      name: "Property 1",
      location: "Location 1",
      price: 500,
    },
  ] as any;
  const booking = {
    id: 1,
    propertyId: 1,
    property: {
      id: 1,
      name: "Property 1",
      location: "Location 1",
      price: 500,
    },
    startDate: new Date("2022-01-01"),
    endDate: new Date("2022-01-10"),
  } as any;
  const wrapper = ({ children }: any) => (
    <AppContext.Provider value={{ properties } as any}>
      <MemoryRouter>{children}</MemoryRouter>
    </AppContext.Provider>
  );

  beforeEach(() => {
    setOpenModal = vi.fn();
  });

  it("renders without crashing", () => {
    render(
      <DeleteBookingModal
        booking={booking}
        openModal={openModal}
        setOpenModal={setOpenModal}
        action={action}
      />,
      { wrapper }
    );
  });

  it("displays the modal title", () => {
    const { getByText } = render(
      <DeleteBookingModal
        booking={booking}
        openModal={openModal}
        setOpenModal={setOpenModal}
        action={action}
      />,
      { wrapper }
    );
    expect(
      getByText("Are you sure you want to delete this booking?")
    ).toBeInTheDocument();
  });

  it('closes the modal when the "Yes, I\'m sure" button is clicked', async () => {
    const { getByText } = render(
      <DeleteBookingModal
        booking={booking}
        openModal={openModal}
        setOpenModal={setOpenModal}
        action={action}
      />,
      { wrapper }
    );
    const yesButton = getByText("Yes, I'm sure");
    await act(() => {
      fireEvent.click(yesButton);
    });
    expect(action).toHaveBeenCalled();
  });

  it('closes the modal when the "No, cancel" button is clicked', async () => {
    const { getByText } = render(
      <DeleteBookingModal
        booking={booking}
        openModal={openModal}
        setOpenModal={setOpenModal}
        action={action}
      />,
      { wrapper }
    );
    const noButton = getByText("No, cancel");

    fireEvent.click(noButton);
    expect(setOpenModal).toHaveBeenCalledWith(false);
  });
});
