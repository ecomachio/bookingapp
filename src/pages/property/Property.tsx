import { Gallery } from "./../../components/Gallery";
import { PropertyDescriptionList } from "./PropertyDescriptionList";
import { useParams } from "react-router-dom";
import useProperty from "../../hooks/useProperty";
import VerticalSpacing from "../../components/VerticalSpacing";
import PropertyForm from "./PropertyForm";

const Property = () => {
  const { id } = useParams();
  const { property } = useProperty(Number(id));

  if (!property) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center">
        <div className="flex  flex-col mb-4 ">
          <h5 className="text-4xl font-bold tracking-tight text-gray-800 dark:text-white">
            {property.name}
          </h5>
          <p className="font-light text-lg text-gray-700 dark:text-gray-400">
            {property.description}
          </p>
        </div>
      </div>
      <Gallery mainImage={property.image} images={property.secondaryImages} />
      <VerticalSpacing size={4} />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <PropertyDescriptionList property={property} />
        </div>
        <PropertyForm property={property} />
      </div>
    </div>
  );
};

export default Property;
