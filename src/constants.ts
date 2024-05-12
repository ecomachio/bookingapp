import { TFilterOptions } from "./types";
console.log(import.meta.env);

export const BASE_URL = import.meta.env.BASE_URL;
export const SEED_FILE_URL = `${BASE_URL}seed.json`;
export const PROPERTIES_URL = `${BASE_URL}/properties`;
export const BOOKINGS_URL = `${BASE_URL}/bookings`;

export const DEFAULT_ERROR_MESSAGE =
  "Something went wrong. Please try again later.";

export const FILTER_OPTIONS = {
  all: "all" as TFilterOptions,
  house: "house" as TFilterOptions,
  apartment: "apartment" as TFilterOptions,
  cabin: "cabin" as TFilterOptions,
  pool: "pool" as TFilterOptions,
  desert: "desert" as TFilterOptions,
  other: "other" as TFilterOptions,
} as const;

export const FILTER_OPTIONS_DESC = {
  [FILTER_OPTIONS.all]: "All Categories",
  [FILTER_OPTIONS.house]: "House",
  [FILTER_OPTIONS.apartment]: "Apartment",
  [FILTER_OPTIONS.cabin]: "Cabin",
  [FILTER_OPTIONS.pool]: "Pool",
  [FILTER_OPTIONS.desert]: "Desert",
  [FILTER_OPTIONS.other]: "Others",
} as const;
