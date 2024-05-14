import { List } from "flowbite-react";

export interface PropertyDescriptionItemProps {
  label: string;
  value: string | number;
}
export function PropertyDescriptionItem({
  label,
  value,
}: PropertyDescriptionItemProps) {
  return (
    <List.Item className="py-2 sm:py-3">
      <div className="flex items-center space-x-4 rtl:space-x-reverse">
        <div className="min-w-0 flex-1">
          <p className="truncate text-md font-medium text-gray-900 dark:text-white">
            {label}
          </p>
        </div>
        <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
          {value}
        </div>
      </div>
    </List.Item>
  );
}
