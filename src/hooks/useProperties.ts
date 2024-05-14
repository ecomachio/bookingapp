import { useContext, useEffect, useState } from "react";
import { TPropertyListResponse } from "../types";
import { AppContext } from "../context/AppContext";
import { API } from "../services/api";

const useProperties = () => {
  const { properties, setProperties } = useContext(AppContext);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<unknown>(null);

  useEffect(() => {
    // if properties are already loaded, don't fetch again
    if (properties.length === 0) {
      const fetchProperty = async () => {
        setIsLoading(true);

        try {
          const response = await API.get<TPropertyListResponse>();
          setProperties(response.properties);
        } catch (error) {
          setError(error);
        } finally {
          setIsLoading(false);
        }
      };

      fetchProperty();
    }
  }, [properties.length, setProperties]);

  return { properties, isLoading, error };
};

export default useProperties;
