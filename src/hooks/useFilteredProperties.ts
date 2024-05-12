import { useEffect, useState } from "react";
import { TCategory, TFilterOptions, TProperty } from "../types";
import { FILTER_OPTIONS } from "../constants";

function useFilteredProperties(
  properties: TProperty[],
  selectedFilter: TFilterOptions
) {
  console.log("useFilteredProperties called", properties, selectedFilter);
  const [filteredProperties, setFilteredProperties] = useState<TProperty[]>(properties);
  console.log("filteredProperties 2", filteredProperties);
  useEffect(() => {
    if (selectedFilter === FILTER_OPTIONS.all)
      setFilteredProperties(properties);
    else
      setFilteredProperties(
        properties.filter((p) =>
          p.categories.includes(selectedFilter as TCategory)
        )
      );

    console.log("filteredProperties 3", filteredProperties);
  }, [properties, selectedFilter]);

  console.log("filteredProperties 4 ", filteredProperties.length);

  return filteredProperties;
}

export default useFilteredProperties;
