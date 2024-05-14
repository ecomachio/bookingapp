import { FormInputs, Mode, TBooking, TProperty } from "../../types";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { Controller, useForm } from "react-hook-form";
import { areIntervalsOverlapping } from "date-fns";
import { Button, Card, Label, List } from "flowbite-react";
import { formatDate, getDaysBetweenDates } from "../../utils/date";
import { DateRangePicker } from "../../components/DateRangePicker";
import VerticalSpacing from "../../components/VerticalSpacing";
import { toUSD } from "../../utils/currency";

interface BookingFormProps {
  property: TProperty;
  booking?: TBooking;
  mode: Mode;
}

export function BookingForm({ property, booking, mode }: BookingFormProps) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { addBooking, editBooking } = useContext(AppContext);
  const [isChangeOpen, setIsChangeOpen] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    setError,
    clearErrors,
  } = useForm<FormInputs>();

  const watchDateRange = watch("dateRange");

  useEffect(() => {
    if (searchParams.get("start") && searchParams.get("end")) {
      const start = new Date(searchParams.get("start") as string);
      const end = new Date(searchParams.get("end") as string);

      setValue("dateRange", { startDate: start, endDate: end });
    } else {
      setValue("dateRange", {
        startDate: booking?.startDate || null,
        endDate: booking?.endDate || null,
      });
    }
  }, [booking?.endDate, booking?.startDate, searchParams, setValue]);

  if (!property || (mode === "edit" && !booking)) {
    return <div>Loading...</div>;
  }

  const onSubmit = (data: FormInputs) => {
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

    const isAvailable = property.bookedDates
      .filter((b) => b.id !== Number(booking?.id))
      .every((booking) => {
        return !areIntervalsOverlapping(
          {
            start: new Date(booking.startDate),
            end: new Date(booking.endDate),
          },
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
        propertyId: property.id,
        id: booking!.id,
        startDate: new Date(data.dateRange.startDate),
        endDate: new Date(data.dateRange.endDate),
      });
      navigate(`/bookings`);
    } else {
      const bookingId = Math.floor(Math.random() * 1000);
      addBooking({
        propertyId: property.id,
        id: bookingId,
        startDate: new Date(data.dateRange.startDate),
        endDate: new Date(data.dateRange.endDate),
      });
      navigate(`/bookings/${property.id}/confirmation/${bookingId}`);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col w-full justify-self-end sm:justify-start"
    >
      <Card>
        <List unstyled>
          <List.Item>
            <div className="flex items-center justify-between">
              <div className="flex flex-col space-y-2 w-full">
                <Label>Dates</Label>
                {!isChangeOpen ? (
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {watchDateRange?.startDate && watchDateRange?.endDate && (
                      <>
                        {formatDate(new Date(watchDateRange.startDate))} -{" "}
                        {formatDate(new Date(watchDateRange.endDate))}
                      </>
                    )}
                  </p>
                ) : (
                  <Controller
                    name="dateRange"
                    control={control}
                    rules={{
                      required: true,
                    }}
                    render={({ field: { onChange, value } }) => {
                      return (
                        <div className="flex flex-col space-y-2 w-full">
                          <DateRangePicker
                            value={value}
                            setValue={(e) => {
                              if (e?.startDate && e?.endDate) {
                                onChange(e);
                                clearErrors("dateRange");
                              } else {
                                setError("dateRange", {
                                  type: "custom",
                                  message: "Please select a date range",
                                });
                                onChange(null);
                              }
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
          {mode === "edit" ? "Save changes" : "Confirm booking"}
        </Button>
      </div>
    </form>
  );
}
