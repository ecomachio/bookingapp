import { useNavigate, useParams } from "react-router-dom";
import { useErrorBoundary } from "react-error-boundary";
import useProperty from "../../hooks/useProperty";
import { toUSD } from "../../utils/currency";
import { Button, Card, List } from "flowbite-react";

import { TProperty } from "../../types";
import { DateRangePicker } from "../../components/DateRangePicker";
import VerticalSpacing from "../../components/VerticalSpacing";
import { DateValueType } from "react-tailwindcss-datepicker";
import { useContext, useMemo } from "react";
import { getDaysBetweenDates } from "../../utils/date";
import Image from "../../components/Image";
import { Controller, useForm } from "react-hook-form";
import { AppContext } from "../../context/AppContext";
import { areIntervalsOverlapping } from "date-fns";

type Inputs = {
  dateRange: DateValueType;
};

const Property = () => {
  const { id } = useParams();
  const { showBoundary } = useErrorBoundary();
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
    setError,
  } = useForm<Inputs>();

  const { addBooking } = useContext(AppContext);
  const { property } = useProperty(Number(id));

  const watchDateRange = watch("dateRange");

  const daysSelected = useMemo(() => {
    if (
      !watchDateRange ||
      !watchDateRange.startDate ||
      !watchDateRange.endDate
    ) {
      return 0;
    }

    const start = new Date(watchDateRange.startDate);
    const end = new Date(watchDateRange.endDate);

    return getDaysBetweenDates(start, end);
  }, [watchDateRange]);

  if (!property) {
    return <div>Loading...</div>;
  }

  const onSubmit = (data: Inputs) => {
    console.log("submit", data, errors);

    // validate date
    if (!data.dateRange) {
      showBoundary(new Error("Invalid date range"));
      return;
    }

    // validate date range
    if (!data.dateRange.startDate || !data.dateRange.endDate) {
      showBoundary(new Error("Invalid date range"));
      return;
    }

    const startDate = new Date(data.dateRange.startDate);
    const endDate = new Date(data.dateRange.endDate);
    console.log("startDate", startDate);

    // check if the selected date range is available

    const isAvailable = property.bookedDates.every((booking) => {
      return !areIntervalsOverlapping(
        { start: new Date(booking.startDate), end: new Date(booking.endDate) },
        {
          start: new Date(startDate),
          end: new Date(endDate),
        },
        { inclusive: true }
      );
    });

    console.log("isAvailable", isAvailable);
    if (!isAvailable) {
      setError("dateRange", {
        type: "custom",
        message: "Property is not available for the selected dates",
      });
      return;
    }

    const bookingId = Math.floor(Math.random() * 1000);

    addBooking({
      id: bookingId,
      propertyId: property.id,
      startDate,
      endDate,
    });

    navigate(`/property/${property.id}/confirmation/${bookingId}`);
  };

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
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col w-full md:w-9/12 justify-self-end sm:justify-start"
        >
          <Card>
            <h5 className="text-2xl font-semibold text-gray-900 dark:text-white">
              {toUSD(property.price)}{" "}
              <span className="text-base font-light">/ night</span>
            </h5>
            <Controller
              name="dateRange"
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange, value } }) => {
                return (
                  <div className="flex flex-col space-y-2">
                    <DateRangePicker
                      value={value}
                      setValue={onChange}
                      placeholder="Check-in - Checkout"
                    />

                    <p
                      className={`text-red-500 text-sm transition-all duration-500 ease-in-out ${
                        errors.dateRange
                          ? "opacity-100 transform translate-y-0"
                          : "opacity-0 -translate-y-2"
                      }`}
                    >
                      {errors.dateRange?.message}
                    </p>
                  </div>
                );
              }}
            />
            <List
              unstyled
              className="max-w divide-y divide-gray-200 dark:divide-gray-700"
            >
              <List.Item className="py-2 sm:py-3">
                <div className="flex items-center space-x-4 rtl:space-x-reverse">
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-md font-light text-gray-900 dark:text-white">
                      Days
                    </p>
                  </div>
                  <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                    {daysSelected}
                  </div>
                </div>
              </List.Item>

              <List.Item className="py-2 sm:py-3">
                <div className="flex items-center space-x-4 rtl:space-x-reverse">
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-md font-light text-gray-900 dark:text-white">
                      Total price
                    </p>
                  </div>
                  <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                    {toUSD(property.price * daysSelected)}
                  </div>
                </div>
              </List.Item>
            </List>
            <Button
              type="submit"
              color="blue"
              pill
              size="md"
              className="self-end"
            >
              Book now
            </Button>
          </Card>
        </form>
      </div>
    </div>
  );
};

export default Property;

interface PropertyDescriptionItemProps {
  label: string;
  value: string | number;
}

function PropertyDescriptionItem({
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

interface PropertyDescriptionListProps {
  property: TProperty;
}

function PropertyDescriptionList({ property }: PropertyDescriptionListProps) {
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

interface GalleryProps {
  mainImage: string;
  images: string[];
}

function Gallery({ mainImage, images }: GalleryProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 h-full ">
      <div>
        <Image src={mainImage} alt="" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2">
        {images.map((image) => (
          <div>
            <Image src={image} alt="" />
          </div>
        ))}
      </div>
    </div>
  );
}
