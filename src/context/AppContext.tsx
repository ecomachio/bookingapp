import React, { createContext, useEffect, useState } from "react";
import { TBooking, TProperty, TPropertyListResponse } from "../types";
import { API } from "../services/api";
import { SEED_FILE_URL } from "../constants";
import { BookingService } from "../services/bookingService";

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
    const updatedProperties = BookingService.add(properties, booking);
    setProperties(updatedProperties);
  };

  const editBooking = (booking: TBooking) => {
    const updatedProperties = BookingService.edit(properties, booking);
    setProperties(updatedProperties);
  };

  const deleteBooking = (bookingId: number, propertyId: number) => {
    const updatedProperties = BookingService.delete(
      properties,
      bookingId,
      propertyId
    );
    setProperties(updatedProperties);
  };

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
      value={{
        properties,
        setProperties,
        addBooking,
        editBooking,
        deleteBooking,
        isLoading,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
