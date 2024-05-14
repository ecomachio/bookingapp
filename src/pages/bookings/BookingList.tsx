import { useContext, useState } from "react";

import { Button, Card, List } from "flowbite-react";
import VerticalSpacing from "../../components/VerticalSpacing";

import { formatDate, getDaysBetweenDates } from "../../utils/date";
import EditIcon from "../../icons/EditIcon";
import DeleteIcon from "../../icons/DeleteIcon";
import { toUSD } from "../../utils/currency";
import useBookings from "../../hooks/useBookings";
import { DeleteBookingModal } from "./modals/DeleteBookingModal";
import { Link, Outlet } from "react-router-dom";
import { AppContext } from "../../context/AppContext";

const BookingList = () => {
  const { deleteBooking } = useContext(AppContext);
  const { bookings: allBookings } = useBookings();
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

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
          {allBookings.length === 0 && (
            <List.Item className="flex items-center justify-between py-3 sm:py-4">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                You have no bookings yet
              </p>
              <Button
                color="blue"
                size="xs"
                pill
                className="ml-2"
                as={Link}
                to="/"
              >
                Book now
              </Button>
            </List.Item>
          )}
          {allBookings.map((booking) => (
            <List.Item key={booking.id} className="py-3 sm:py-4 relative">
              <div className="flex items-center">
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
                    {booking.property.name}
                  </p>
                  <p className="truncate text-sm text-gray-500 dark:text-gray-400">
                    {booking.property.location}
                  </p>
                  <VerticalSpacing size={2} />
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

                <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white absolute right-0 top-2">
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
                    onClick={() => {
                      setOpenDeleteModal(true);
                    }}
                  >
                    <DeleteIcon />
                  </Button>
                  <DeleteBookingModal
                    openModal={openDeleteModal}
                    setOpenModal={setOpenDeleteModal}
                    action={() => {
                      deleteBooking(booking.id, booking.property.id);
                      setOpenDeleteModal(false);
                    }}
                    booking={booking}
                  />
                </div>
              </div>
            </List.Item>
          ))}
        </List>
      </Card>

      <Outlet />
    </div>
  );
};

export default BookingList;
