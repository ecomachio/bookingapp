import { useState } from "react";

import { Button, Card, List } from "flowbite-react";
import VerticalSpacing from "../../components/VerticalSpacing";

import { formatDate, getDaysBetweenDates } from "../../utils/date";
import EditIcon from "../../components/EditIcon";
import DeleteIcon from "../../components/DeleteIcon";
import { toUSD } from "../../utils/currency";
import useBookings from "../../hooks/useBookings";
import { DeleteBookingModal } from "./modals/DeleteBookingModal";
import { EditBookingModal } from "./modals/EditBookingModal";
import { Link, Outlet } from "react-router-dom";

const BookingList = () => {
  const { bookings: allBookings } = useBookings();
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);

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
                    {formatDate(booking.startDate)} to{" "}
                    {formatDate(booking.endDate)}
                  </p>
                  <p className="truncate text-sm text-gray-500 dark:text-gray-400">
                    {toUSD(
                      booking.property.price *
                        getDaysBetweenDates(booking.startDate, booking.endDate)
                    )}
                  </p>
                </div>

                <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                  <Link to={`/bookings/${booking.id}/${booking.property.id}`}>
                    <Button
                      role="button"
                      aria-label="Edit"
                      size="xs"
                      color="primary"
                      pill
                    >
                      <EditIcon />
                    </Button>
                  </Link>
                  <Button
                    role="button"
                    aria-label="Delete"
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
      <DeleteBookingModal
        openModal={openDeleteModal}
        setOpenModal={setOpenDeleteModal}
      />
      <EditBookingModal
        openModal={openEditModal}
        setOpenModal={setOpenEditModal}
      />
      <Outlet />
    </div>
  );
};

export default BookingList;
