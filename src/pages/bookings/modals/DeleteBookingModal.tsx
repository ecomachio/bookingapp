import { Button } from "flowbite-react";
import DeleteIcon from "../../../components/DeleteIcon";
import { ModalComponent, ModalComponentProps } from "../../../components/Modal";

type DeleteModalProps = Pick<
  ModalComponentProps,
  "openModal" | "setOpenModal"
> & {
  action: () => void;
};

export function DeleteBookingModal({
  openModal,
  setOpenModal,
  action,
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
    />
  );
}
