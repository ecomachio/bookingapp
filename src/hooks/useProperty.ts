import { useState, useEffect, useContext } from "react";
import { TProperty, TPropertyListResponse } from "../types";
import { API } from "../services/api";
import { BASE_URL } from "../constants";
import { AppContext } from "../context/AppContext";

const useProperty = (id: number) => {
  const { properties } = useContext(AppContext);
  const [property, setProperty] = useState<TProperty | null>(null);

  useEffect(() => {
    const property = properties.find((property) => property.id === id);
    if (property) {
      setProperty(property);
    } else {
      const fetchProperty = async () => {
        try {
          const response = await API.get<TPropertyListResponse>(BASE_URL);
          const property = response.properties.find(
            (property) => property.id === id
          );
          console.log("property", property);
          if (!property) {
            throw new Error("Property not found");
          }

          setProperty(property);
        } catch (error) {
          console.error("Error fetching property", error);
        }
      };
      fetchProperty();
    }
  }, [id, properties]);

  return { property };
};

export default useProperty;
