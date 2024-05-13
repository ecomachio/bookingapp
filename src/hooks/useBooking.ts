import { useContext } from "react";
import { AppContext } from "../context/AppContext";

const useBooking = (propertyId: number, bookingId: number) => {
  const { properties } = useContext(AppContext);

  const property = properties.find((property) => property.id === propertyId);
  const booking = property?.bookedDates.find(
    (booking) => booking.id === bookingId
  );

  return { property, booking };
};

export default useBooking;
