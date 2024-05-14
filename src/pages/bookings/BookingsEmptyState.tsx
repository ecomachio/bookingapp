import { Button, List } from "flowbite-react";
import { Link } from "react-router-dom";

export function BookingsEmptyState() {
  return (
    <List.Item className="flex items-center justify-between py-3 sm:py-4">
      <p className="text-sm text-gray-500 dark:text-gray-400">
        You have no bookings yet
      </p>
      <Button color="blue" size="xs" pill className="ml-2" as={Link} to="/">
        Book now
      </Button>
    </List.Item>
  );
}
