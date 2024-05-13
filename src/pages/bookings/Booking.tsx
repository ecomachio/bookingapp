import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useErrorBoundary } from "react-error-boundary";
import useProperty from "../../hooks/useProperty";
import { toUSD } from "../../utils/currency";
import { Button, Card, Label, List } from "flowbite-react";

import { DateRangePicker } from "../../components/DateRangePicker";
import VerticalSpacing from "../../components/VerticalSpacing";
import { DateValueType } from "react-tailwindcss-datepicker";
import { useContext, useEffect, useState } from "react";
import { formatDate, getDaysBetweenDates } from "../../utils/date";
import Image from "../../components/Image";
import { Controller, useForm } from "react-hook-form";
import { AppContext } from "../../context/AppContext";
import { add, areIntervalsOverlapping } from "date-fns";
import useBooking from "../../hooks/useBooking";

type Inputs = {
  dateRange: DateValueType;
};

type Mode = "add" | "edit" | "view";

const Booking = () => {
  const { propertyId, bookingId } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  console.log("propertyId", propertyId);
  const { showBoundary } = useErrorBoundary();
  const { property } = useProperty(Number(propertyId));
  const { booking } = useBooking(Number(propertyId), Number(bookingId));
  const [isChangeOpen, setIsChangeOpen] = useState(false);
  const { addBooking, editBooking } = useContext(AppContext);
  const mode: Mode = bookingId ? "edit" : "add";

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    setError,
  } = useForm<Inputs>();
  console.log("params", propertyId, bookingId, booking);

  useEffect(() => {
    console.log("useEffect", searchParams);
    if (searchParams.get("start") && searchParams.get("end")) {
      const start = new Date(searchParams.get("start") as string);
      const end = new Date(searchParams.get("end") as string);

      setValue("dateRange", { startDate: start, endDate: end });
    } else {
      setValue("dateRange", {
        startDate: booking?.startDate || new Date(),
        endDate: booking?.endDate || add(new Date(), { days: 1 }),
      });
    }
  }, [booking?.endDate, booking?.startDate, searchParams, setValue]);

  const watchDateRange = watch("dateRange");

  console.log("booking", booking);

  if (!property) {
    return <div>Loading...</div>;
  }

  const onSubmit = (data: Inputs) => {
    if (!data.dateRange) {
      setError("dateRange", {
        type: "custom",
        message: "Please select a date range",
      });
      return;
    }

    if (!data.dateRange.startDate || !data.dateRange.endDate) {
      setError("dateRange", {
        type: "custom",
        message: "Please select a date range",
      });
      return;
    }

    const startDate = new Date(data.dateRange.startDate);
    const endDate = new Date(data.dateRange.endDate);

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

    if (!isAvailable) {
      setError("dateRange", {
        type: "custom",
        message: "Property is not available for the selected dates",
      });
      return;
    }

    if (mode === "edit") {
      editBooking({
        propertyId: Number(propertyId),
        id: Number(bookingId),
        startDate: new Date(data.dateRange.startDate),
        endDate: new Date(data.dateRange.endDate),
      });
      navigate(`/bookings`);
    } else {
      const bookingId = Math.floor(Math.random() * 1000);
      addBooking({
        propertyId: Number(propertyId),
        id: bookingId,
        startDate: new Date(data.dateRange.startDate),
        endDate: new Date(data.dateRange.endDate),
      });
      navigate(`/bookings/${propertyId}/confirmation/${bookingId}`);
    }
  };

  return (
    <>
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
        Request a Booking
      </h2>
      <VerticalSpacing size={4} />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Image src={property?.image} alt={property?.name} />

        <div className="flex flex-col w-full">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            {property?.name}, {property?.location}
          </h1>

          <p className="text-sm text-gray-500 dark:text-gray-400">
            {property?.description}
          </p>
          <VerticalSpacing size={4} />
          <h5 className="text-lg font-semibold text-gray-900 dark:text-white">
            Your trip
          </h5>
          <VerticalSpacing size={2} />
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col w-full justify-self-end sm:justify-start"
          >
            <Card>
              <List unstyled>
                <List.Item>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Dates</Label>
                      {!isChangeOpen ? (
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {formatDate(
                            new Date(watchDateRange?.startDate || "")
                          )}{" "}
                          -{" "}
                          {formatDate(new Date(watchDateRange?.endDate || ""))}
                        </p>
                      ) : (
                        <Controller
                          name="dateRange"
                          control={control}
                          rules={{ required: true }}
                          render={({ field: { onChange, value } }) => {
                            return (
                              <div className="flex flex-col space-y-2">
                                <DateRangePicker
                                  value={value}
                                  setValue={(e) => {
                                    onChange(e);
                                    setIsChangeOpen(false);
                                  }}
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
                      )}
                    </div>
                    {!isChangeOpen && (
                      <Button
                        size="sm"
                        color="light"
                        pill
                        onClick={() => setIsChangeOpen(!isChangeOpen)}
                      >
                        Change
                      </Button>
                    )}
                  </div>
                </List.Item>
                <VerticalSpacing size={2} />
                <List.Item>
                  <Label>Price</Label>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {toUSD(property.price)} per night
                  </p>
                </List.Item>
                <VerticalSpacing size={2} />
                <List.Item>
                  <Label>Total</Label>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {toUSD(
                      property.price *
                        getDaysBetweenDates(
                          new Date(watchDateRange?.startDate || ""),
                          new Date(watchDateRange?.endDate || "")
                        )
                    )}
                  </p>
                </List.Item>
              </List>
            </Card>
            <VerticalSpacing size={4} />
            <div className="flex justify-end gap-4">
              <Button color="blue" pill size="lg" type="submit">
                Confirm Booking
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Booking;
