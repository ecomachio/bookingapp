import { useState, useEffect, useMemo } from "react";

import { Button, Card, List, Modal } from "flowbite-react";
import VerticalSpacing from "../../components/VerticalSpacing";
import useProperties from "../../hooks/useProperties";
import { TBookingWithProperty } from "../../types";
import { getDaysBetweenDates } from "../../utils/date";
import EditIcon from "../../components/EditIcon";
import DeleteIcon from "../../components/DeleteIcon";
import { toUSD } from "../../utils/currency";

const Bookings = () => {
  const { properties } = useProperties();
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);

  const allBookings = useMemo(
    () =>
      properties.reduce<TBookingWithProperty[]>((acc, property) => {
        const bookings = property.bookedDates.map((booking) => {
          return { ...booking, property: property };
        }); // add the bookings to the accumulator

        return [...acc, ...bookings];
      }, []),
    [properties]
  );

  return (
    <div className="container mx-auto ">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
        My Bookings
      </h1>
      <p className="text-sm text-gray-500 dark:text-gray-400">
        Here you can see all your bookings
      </p>
      <VerticalSpacing size={4} />

      <Card className="max-w">
        <List
          unstyled
          className="divide-y divide-gray-200 dark:divide-gray-700"
        >
          {allBookings.map((booking) => (
            <List.Item key={booking.id} className="py-3 sm:py-4">
              <div className="flex items-center space-x-4">
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
                    {booking.property.name}
                  </p>
                  <p className="truncate text-sm text-gray-500 dark:text-gray-400">
                    {booking.property.location}
                  </p>
                  <p className="truncate text-sm text-gray-500 dark:text-gray-400">
                    {getDaysBetweenDates(booking.startDate, booking.endDate)}{" "}
                    nights
                  </p>
                  <p className="truncate text-sm text-gray-500 dark:text-gray-400">
                    {toUSD(
                      booking.property.price *
                        getDaysBetweenDates(booking.startDate, booking.endDate)
                    )}
                  </p>
                </div>

                <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                  <Button
                    size="xs"
                    color="primary"
                    pill
                    onClick={() => setOpenEditModal(true)}
                  >
                    <EditIcon />
                  </Button>
                  <Button
                    size="xs"
                    color="primary"
                    pill
                    onClick={() => setOpenDeleteModal(true)}
                  >
                    <DeleteIcon />
                  </Button>
                </div>
              </div>
            </List.Item>
          ))}
        </List>
      </Card>
      <DeleteModal
        openModal={openDeleteModal}
        setOpenModal={setOpenDeleteModal}
      />
      <EditModal openModal={openEditModal} setOpenModal={setOpenEditModal} />
    </div>
  );
};

interface DeleteModalProps {
  openModal: boolean;
  setOpenModal: (value: boolean) => void;
}

export function DeleteModal({ openModal, setOpenModal }: DeleteModalProps) {
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
          <div className="text-center">
            <DeleteIcon />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Are you sure you want to delete this booking?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={() => setOpenModal(false)}>
                {"Yes, I'm sure"}
              </Button>
              <Button color="gray" onClick={() => setOpenModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

interface EditModalProps {
  openModal: boolean;
  setOpenModal: (value: boolean) => void;
}

export function EditModal({ openModal, setOpenModal }: EditModalProps) {
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
          <div className="text-center">
            <EditIcon />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Edit this booking
            </h3>
            {/* Add your form fields here */}
            <div className="flex justify-center gap-4">
              <Button color="success" onClick={() => setOpenModal(false)}>
                Save Changes
              </Button>
              <Button color="gray" onClick={() => setOpenModal(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Bookings;
