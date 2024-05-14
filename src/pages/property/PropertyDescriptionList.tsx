import { List } from "flowbite-react";
import { PropertyDescriptionItem } from "./PropertyDescriptionItem";
import { toUSD } from "../../utils/currency";
import { TProperty } from "../../types";

export interface PropertyDescriptionListProps {
  property: TProperty;
}
export function PropertyDescriptionList({
  property,
}: PropertyDescriptionListProps) {
  return (
    <List
      unstyled
      className="max-w divide-y divide-gray-200 dark:divide-gray-700"
    >
      <PropertyDescriptionItem
        label="Guests capacity"
        value={property.capacity}
      />
      <PropertyDescriptionItem label="Rooms" value={property.rooms} />
      <PropertyDescriptionItem label="Bathrooms" value={property.bathrooms} />
      <PropertyDescriptionItem label="Location" value={property.location} />
      <PropertyDescriptionItem label="Price" value={toUSD(property.price)} />
    </List>
  );
}
