export type TProperty = {
  id: number;
  name: string;
  price: number;
  description: string;
  location: string;
  capacity: number;
  image: string;
  secondaryImages: string[];
  rooms: number;
  bathrooms: number;
  welcomeMessage: string;
  categories: TCategory[];
  bookedDates: TBooking[];
};

export type TPropertyResponse = {
  property: TProperty;
};

export type TPropertyListResponse = {
  properties: TProperty[];
};

export type TBooking = {
  id: number;
  propertyId: number;
  startDate: Date;
  endDate: Date;
};

export type TBookingWithProperty = TBooking & {
  property: TProperty;
};

export type TCategory =
  | "house"
  | "apartment"
  | "cabin"
  | "pool"
  | "desert"
  | "other";
export type TFilterOptions = TCategory | "all";
