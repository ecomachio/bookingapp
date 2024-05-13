import React, { createContext, useEffect, useState } from "react";
import { TBooking, TProperty, TPropertyListResponse } from "../types";
import { API } from "../services/api";
import { SEED_FILE_URL } from "../constants";

interface AppState {
  properties: TProperty[];
  setProperties: React.Dispatch<React.SetStateAction<TProperty[]>>;
  addBooking: (booking: TBooking) => void;
  editBooking: (booking: TBooking) => void;
  isLoading?: boolean;
}

const initialState: AppState = {
  properties: [],
  setProperties: () => {},
  addBooking: () => {},
  editBooking: () => {},
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
    console.log("bookingfff", booking);
    const current = property.bookedDates.find((b) => b.id === booking.id);
    console.log("current", current);
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

  console.log("properties", properties);

  // load all properties when the app starts
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setIsLoading(true);
        const response = await API.get<TPropertyListResponse>(SEED_FILE_URL);
        console.log("response", response);
        setProperties(response.properties);
      } catch (error) {
        console.error("Error fetching properties", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProperties();
  }, []);

  return (
    <AppContext.Provider
      value={{ properties, setProperties, addBooking, editBooking, isLoading }}
    >
      {children}
    </AppContext.Provider>
  );
};
