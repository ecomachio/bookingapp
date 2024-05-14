import { Modal } from "flowbite-react";

export interface ModalComponentProps {
  openModal: boolean;
  setOpenModal: (value: boolean) => void;
  title: string;
  icon: JSX.Element;
  actions: JSX.Element[];
  children?: JSX.Element;
}

export function ModalComponent({
  openModal,
  setOpenModal,
  title,
  icon,
  actions,
  children,
}: ModalComponentProps) {
  return (
    <>
      <Modal
        show={openModal}
        size="md"
        position="center"
        onClose={() => setOpenModal(false)}
        popup
      >
        <Modal.Header />
        <Modal.Body>
          <div className="flex flex-col items-center space-y-4">
            {icon}
            <h3 className="mb-5 text-lg font-normal text-center text-gray-500 dark:text-gray-400">
              {title}
            </h3>
            {children}
            <div className="flex justify-center gap-4">{actions}</div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
