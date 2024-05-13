import React, { createContext, useEffect, useState } from "react";
import { TBooking, TProperty, TPropertyListResponse } from "../types";
import { API } from "../services/api";
import { SEED_FILE_URL } from "../constants";

interface AppState {
  properties: TProperty[];
  setProperties: React.Dispatch<React.SetStateAction<TProperty[]>>;
  addBooking: (booking: TBooking) => void;
  editBooking: (booking: TBooking) => void;
  deleteBooking: (bookingId: number, propertyId: number) => void;
  isLoading?: boolean;
}

const initialState: AppState = {
  properties: [],
  setProperties: () => {},
  addBooking: () => {},
  editBooking: () => {},
  deleteBooking: () => {},
  isLoading: true,
};

export const AppContext = createContext<AppState>(initialState);
export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [properties, setProperties] = useState<TProperty[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const addBooking = (booking: TBooking) => {
    const updatedProperties = properties.map((property) => {
      if (property.id === booking.propertyId) {
        return {
          ...property,
          bookedDates: [...property.bookedDates, booking],
        };
      }
      return property;
    });
    setProperties(updatedProperties);
  };

  const editBooking = (booking: TBooking) => {
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

    setProperties(updatedProperties);
  };

  const deleteBooking = (bookingId: number, propertyId: number) => {
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

    setProperties(updatedProperties);
  };

  // load all properties when the app starts
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setIsLoading(true);
        const response = await API.get<TPropertyListResponse>(SEED_FILE_URL);

        setProperties(response.properties);
      } catch (error) {
        console.error("Error fetching properties", error);
        throw error;
      } finally {
        setIsLoading(false);
      }
    };
    fetchProperties();
  }, []);

  return (
    <AppContext.Provider
      value={{ properties, setProperties, addBooking, editBooking, deleteBooking, isLoading }}
    >
      {children}
    </AppContext.Provider>
  );
};
