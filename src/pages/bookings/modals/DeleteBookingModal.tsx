import { Button } from "flowbite-react";
import DeleteIcon from "../../../icons/DeleteIcon";
import { ModalComponent, ModalComponentProps } from "../../../components/Modal";
import { TBookingWithProperty } from "../../../types";
import { getDaysBetweenDates } from "../../../utils/date";

type DeleteModalProps = Pick<
  ModalComponentProps,
  "openModal" | "setOpenModal"
> & {
  action: () => void;
  booking: TBookingWithProperty;
};

export function DeleteBookingModal({
  openModal,
  setOpenModal,
  action,
  booking,
}: DeleteModalProps) {
  return (
    <ModalComponent
      openModal={openModal}
      setOpenModal={setOpenModal}
      title="Are you sure you want to delete this booking?"
      icon={<DeleteIcon />}
      actions={[
        <Button color="failure" onClick={() => action()}>
          {"Yes, I'm sure"}
        </Button>,
        <Button color="gray" onClick={() => setOpenModal(false)}>
          No, cancel
        </Button>,
      ]}
    >
      <p className="text-sm text-gray-500 dark:text-gray-400">
        {booking.property.name}, {booking.property.location} -{" "}
        {getDaysBetweenDates(booking.startDate, booking.endDate)} nights
      </p>
    </ModalComponent>
  );
}
