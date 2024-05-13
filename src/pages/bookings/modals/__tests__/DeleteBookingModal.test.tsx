import { beforeEach, describe, expect, it, vi } from "vitest";
import { render, fireEvent } from "@testing-library/react";

import { DeleteBookingModal } from "../DeleteBookingModal";

import "@testing-library/jest-dom/vitest";

describe("DeleteBookingModal", () => {
  let openModal: boolean = true;
  let setOpenModal = vi.fn();
  const action = vi.fn();

  beforeEach(() => {
    openModal = false;
    setOpenModal = vi.fn();
  });

  it("renders without crashing", () => {
    render(
      <DeleteBookingModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        action={action}
      />
    );
  });

  it("displays the modal title", () => {
    const { getByText } = render(
      <DeleteBookingModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        action={action}
      />
    );
    expect(
      getByText("Are you sure you want to delete this booking?")
    ).toBeInTheDocument();
  });

  it('closes the modal when the "Yes, I\'m sure" button is clicked', async () => {
    const { getByText } = render(
      <DeleteBookingModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        action={action}
      />
    );
    const yesButton = getByText("Yes, I'm sure");

    fireEvent.click(yesButton);
    expect(setOpenModal).toHaveBeenCalledWith(false);
  });

  it('closes the modal when the "No, cancel" button is clicked', async () => {
    const { getByText } = render(
      <DeleteBookingModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        action={action}
      />
    );
    const noButton = getByText("No, cancel");

    fireEvent.click(noButton);
    expect(setOpenModal).toHaveBeenCalledWith(false);
  });
});
