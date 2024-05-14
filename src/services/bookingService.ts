import { TBooking, TProperty } from "../types";

export const BookingService = {
  add(properties: TProperty[], booking: TBooking) {
    const updatedProperties = properties.map((property) => {
      if (property.id === booking.propertyId) {
        return {
          ...property,
          bookedDates: [...property.bookedDates, booking],
        };
      }
      return property;
    });
    return updatedProperties;
  },

  edit(properties: TProperty[], booking: TBooking) {
    const property = properties.find(
      (property) => property.id === booking.propertyId
    );

    if (!property) {
      throw new Error("Property not found");
    }

    const current = property.bookedDates.find((b) => b.id === booking.id);

    if (!current) {
      throw new Error("Booking not found");
    }

    const updatedBookings = property.bookedDates.map((b) =>
      b.id === booking.id ? booking : b
    );

    const updatedProperties = properties.map((p) =>
      p.id === booking.propertyId ? { ...p, bookedDates: updatedBookings } : p
    );

    return updatedProperties;
  },

  delete(properties: TProperty[], bookingId: number, propertyId: number) {
    const property = properties.find((property) => property.id === propertyId);

    if (!property) {
      throw new Error("Property not found");
    }

    const updatedBookings = property.bookedDates.filter(
      (booking) => booking.id !== bookingId
    );

    const updatedProperties = properties.map((p) =>
      p.id === propertyId ? { ...p, bookedDates: updatedBookings } : p
    );

    return updatedProperties;
  },
};
