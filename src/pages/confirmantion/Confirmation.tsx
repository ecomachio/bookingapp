import { Link, useParams } from "react-router-dom";
import { useErrorBoundary } from "react-error-boundary";
import { Button } from "flowbite-react";
import useBooking from "../../hooks/useBooking";
import { formatDate } from "../../utils/date";
import Image from "../../components/Image";
import VerticalSpacing from "../../components/VerticalSpacing";

const Confirmation = () => {
  const { propertyId, bookingId } = useParams<{
    propertyId: string;
    bookingId: string;
  }>();
  const { property, booking } = useBooking(
    Number(propertyId),
    Number(bookingId)
  );
  const { showBoundary } = useErrorBoundary();

  if (!booking || !property) {
    showBoundary(new Error("Booking not found"));
    return null;
  }

  return (
    <section className="bg-white dark:bg-gray-900 text-center flex items-center justify-center">
      <div className="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-2">
        <div className="max-w-screen-md">
          <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
            Thank you for booking with us!
          </h2>
          <p className="mb-4 font-light text-gray-900 sm:text-xl dark:text-gray-400">
            From {formatDate(booking.startDate)} to{" "}
            {formatDate(booking.endDate)}
          </p>
          <h5 className="my-4 text-lg font-light text-gray-900 dark:text-white">
            {property.welcomeMessage}
          </h5>
          <div className="flex flex-col md:flex-row justify-center gap-4">
            <div className="mx-auto w-3/4 sm:w-full">
              <Image src={property.image} alt={property.name} />
            </div>
          </div>
          <VerticalSpacing size={4} />
          <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4 justify-center">
            <Link to="/" className="btn btn-light">
              <Button color="light" pill>
                Home
              </Button>
            </Link>
            <Link to={"/bookings"} className="btn btn-blue">
              <Button color="blue" pill>
                My Bookings
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Confirmation;
