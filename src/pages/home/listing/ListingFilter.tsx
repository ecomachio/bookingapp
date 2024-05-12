import { getKeys } from "../../../utils/object";
import { TFilterOptions } from "../../../types";
import { FILTER_OPTIONS, FILTER_OPTIONS_DESC } from "../../../constants";

interface FilterButtonProps {
  filter: TFilterOptions;
  selectedFilter: TFilterOptions;
  setSelectedFilter: (filter: TFilterOptions) => void;
}

interface PropertyFilterProps {
  selectedFilter: TFilterOptions;
  setSelectedFilter: (filter: TFilterOptions) => void;
}

const FilterButton = ({
  filter,
  selectedFilter,
  setSelectedFilter,
}: FilterButtonProps) => (
  <button
    key={filter}
    type="button"
    onClick={() => setSelectedFilter(filter)}
    className={`text-base font-medium px-5 py-2.5 text-center me-3 mb-3 rounded-full snap-always snap-center whitespace-nowrap ${
      selectedFilter === filter
        ? "text-blue-700 hover:text-white border border-blue-600 bg-white hover:bg-blue-700  dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:bg-gray-900"
        : "text-gray-900 border border-white hover:border-gray-200 dark:border-gray-900 dark:bg-gray-900 dark:hover:border-gray-700 bg-white dark:text-white"
    }`}
  >
    {FILTER_OPTIONS_DESC[filter]}
  </button>
);

const PropertyFilter = ({
  selectedFilter,
  setSelectedFilter,
}: PropertyFilterProps) => {
  return (
    <div className="container mx-auto">
      <div className="flex flex-nowrap snap-x snap-mandatory overflow-x-auto no-scrollbar md:justify-center">
        {getKeys(FILTER_OPTIONS).map((filter) => (
          <FilterButton
            key={filter}
            filter={filter}
            selectedFilter={selectedFilter}
            setSelectedFilter={setSelectedFilter}
          />
        ))}
      </div>
    </div>
  );
};

export default PropertyFilter;
