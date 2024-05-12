import { Button, Card } from "flowbite-react";
import Image from "../../../components/Image";
import { TProperty } from "../../../types";
import HomeListEmptyState from "./ListingEmptyState";
import { Link } from "react-router-dom";

interface ListingProps {
  properties: TProperty[];
}

const Listing = ({ properties }: ListingProps) => {
  // TODO: use custom hooks?
  // TODO: use useMemo?
  // TODO: animation when changing filter

  return (
    <div id="listing" className="container mx-auto ">
      {properties.length === 0 && <HomeListEmptyState />}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-start mt-2">
        {properties.map((property) => (
          <Link to={`/property/${property.id}`} key={property.id}>
            <Card
              key={property.id}
              className="max-w-sm"
              renderImage={() => (
                <Image src={property.image} alt={property.description} />
              )}
            >
              <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {property.name}
              </h5>
              <p className="font-normal text-gray-700 dark:text-gray-400">
                {property.description}
              </p>
              <Button color="blue" pill>
                Read more
              </Button>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Listing;
