import { Button } from "flowbite-react";
import EditIcon from "../../../components/EditIcon";
import { ModalComponent, ModalComponentProps } from "../../../components/Modal";

type EditModalProps = Pick<ModalComponentProps, "openModal" | "setOpenModal">;

export function EditBookingModal({ openModal, setOpenModal }: EditModalProps) {
  return (
    <ModalComponent
      openModal={openModal}
      setOpenModal={setOpenModal}
      title="Edit this booking"
      icon={<EditIcon />}
      actions={[
        <Button color="success" onClick={() => setOpenModal(false)}>
          Save Changes
        </Button>,
        <Button color="gray" onClick={() => setOpenModal(false)}>
          Cancel
        </Button>,
      ]}
    />
  );
}
