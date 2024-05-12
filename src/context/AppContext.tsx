import React, { createContext, useEffect, useState } from "react";
import { TBooking, TProperty, TPropertyListResponse } from "../types";
import { API } from "../services/api";
import { BASE_URL } from "../constants";

interface AppState {
  properties: TProperty[];
  setProperties: React.Dispatch<React.SetStateAction<TProperty[]>>;
  addBooking: (booking: TBooking) => void;
  isLoading?: boolean;
}

const initialState: AppState = {
  properties: [],
  setProperties: () => {},
  addBooking: () => {},
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

  console.log("properties", properties);

  // load all properties when the app starts
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setIsLoading(true);
        const response = await API.get<TPropertyListResponse>(BASE_URL);
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
      value={{ properties, setProperties, addBooking, isLoading }}
    >
      {children}
    </AppContext.Provider>
  );
};
