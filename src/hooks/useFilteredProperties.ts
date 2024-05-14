import { useEffect, useState } from "react";
import { TCategory, TFilterOptions, TProperty } from "../types";
import { FILTER_OPTIONS } from "../constants";

function useFilteredProperties(
  properties: TProperty[],
  selectedFilter: TFilterOptions
) {
  const [filteredProperties, setFilteredProperties] =
    useState<TProperty[]>(properties);

  useEffect(() => {
    if (selectedFilter === FILTER_OPTIONS.all)
      setFilteredProperties(properties);
    else
      setFilteredProperties(
        properties.filter((p) =>
          p.categories.includes(selectedFilter as TCategory)
        )
      );
  }, [properties, selectedFilter]);

  return filteredProperties;
}

export default useFilteredProperties;
