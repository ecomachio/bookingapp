import { useContext, useMemo } from "react";
import { AppContext } from "../context/AppContext";
import { TBookingWithProperty } from "../types";

const useBookings = () => {
  const { properties } = useContext(AppContext);

  const bookings = useMemo(
    () =>
      properties.reduce<TBookingWithProperty[]>((acc, property) => {
        const bookings = property.bookedDates.map((booking) => {
          return { ...booking, property: property };
        }); // add the bookings to the accumulator

        return [...acc, ...bookings];
      }, []),
    [properties]
  );

  return { bookings };
};

export default useBookings;
