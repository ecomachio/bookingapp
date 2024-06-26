import { useState } from "react";

import Listing from "./listing/Listing";
import { TFilterOptions } from "../../types";
import ListingFilter from "./listing/ListingFilter";
import { FILTER_OPTIONS } from "../../constants";
import useFilteredProperties from "../../hooks/useFilteredProperties";
import useProperties from "../../hooks/useProperties";
import HomeHero from "./HomeHero";
import VerticalSpacing from "../../components/VerticalSpacing";
import { useErrorBoundary } from "react-error-boundary";
import ScrollToAnchor from "../../components/ScrollToAnchor";

const HomePage = () => {
  const { showBoundary } = useErrorBoundary();
  const [selectedFilter, setSelectedFilter] = useState<TFilterOptions>(
    FILTER_OPTIONS.all
  );
  const { isLoading, properties, error } = useProperties();
  const filteredProperties = useFilteredProperties(properties, selectedFilter);

  if (error) {
    showBoundary(error);
    return null;
  }
  if (isLoading) return <div>Loading...</div>;

  return (
    <>
      <ScrollToAnchor />
      <VerticalSpacing size={10} />
      <HomeHero />
      <VerticalSpacing size={20} />
      <ListingFilter
        selectedFilter={selectedFilter}
        setSelectedFilter={setSelectedFilter}
      />
      <Listing properties={filteredProperties} />
    </>
  );
};

export default HomePage;
