import { BookingForm } from "./BookingForm";
import { useParams } from "react-router-dom";
import useProperty from "../../hooks/useProperty";

import VerticalSpacing from "../../components/VerticalSpacing";
import Image from "../../components/Image";
import useBooking from "../../hooks/useBooking";
import { Mode } from "../../types";

const Booking = () => {
  const { propertyId, bookingId } = useParams();

  const { property } = useProperty(Number(propertyId));
  const { booking } = useBooking(Number(propertyId), Number(bookingId));

  const mode: Mode = bookingId ? "edit" : "add";

  if (!property) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
        Request a Booking
      </h2>
      <VerticalSpacing size={4} />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Image src={property?.image} alt={property?.name} />
        <div className="flex flex-col w-full">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            {property?.name}, {property?.location}
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {property?.description}
          </p>
          <VerticalSpacing size={4} />
          <h5 className="text-lg font-semibold text-gray-900 dark:text-white">
            Your trip
          </h5>
          <VerticalSpacing size={2} />
          <BookingForm booking={booking} property={property} mode={mode} />
        </div>
      </div>
    </>
  );
};

export default Booking;
