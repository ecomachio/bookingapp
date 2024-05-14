import { FormInputs, Mode, TBooking, TProperty } from "../../types";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { Controller, useForm } from "react-hook-form";
import { Button, Card, Label, List } from "flowbite-react";
import { formatDate, getDaysBetweenDates, toDate } from "../../utils/date";
import { DateRangePicker } from "../../components/DateRangePicker";
import VerticalSpacing from "../../components/VerticalSpacing";
import { toUSD } from "../../utils/currency";
import { DEFAULT_DATE_VALIDATION_MESSAGE } from "../../constants";
import { DateValueType } from "react-tailwindcss-datepicker";
import {
  validateBookingForm,
  validateDateSelection,
} from "../../services/validationService";

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
      const start = toDate(searchParams.get("start") as string);
      const end = toDate(searchParams.get("end") as string);

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

  const handleDateSelection = (
    e: DateValueType,
    onChange: (...e: unknown[]) => void
  ) => {
    const { isValid, message } = validateDateSelection(e);

    if (isValid) {
      onChange(e);
      clearErrors("dateRange");
    } else {
      setError("dateRange", {
        type: "custom",
        message,
      });
      onChange(null);
    }
  };

  const onSubmit = (data: FormInputs) => {
    const { isValid, message } = validateBookingForm({
      data,
      property,
      booking,
    });

    if (!isValid) {
      setError("dateRange", {
        type: "custom",
        message,
      });
      return;
    }

    if (
      !data.dateRange ||
      !data.dateRange.startDate ||
      !data.dateRange.endDate
    ) {
      setError("dateRange", {
        type: "custom",
        message: DEFAULT_DATE_VALIDATION_MESSAGE,
      });
      return;
    }

    if (mode === "edit") {
      editBooking({
        propertyId: property.id,
        id: booking!.id,
        startDate: toDate(data.dateRange.startDate),
        endDate: toDate(data.dateRange.endDate),
      });
      navigate(`/bookings`);
    } else {
      const bookingId = Math.floor(Math.random() * 1000);

      addBooking({
        propertyId: property.id,
        id: bookingId,
        startDate: toDate(data.dateRange.startDate),
        endDate: toDate(data.dateRange.endDate),
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
                        {formatDate(toDate(watchDateRange.startDate))} -{" "}
                        {formatDate(toDate(watchDateRange.endDate))}
                      </>
                    )}
                  </p>
                ) : (
                  <Controller
                    name="dateRange"
                    control={control}
                    rules={{
                      required: {
                        message: DEFAULT_DATE_VALIDATION_MESSAGE,
                        value: true,
                      },
                    }}
                    render={({ field: { onChange, value } }) => {
                      return (
                        <div className="flex flex-col space-y-2 w-full">
                          <DateRangePicker
                            value={value}
                            setValue={(e) => handleDateSelection(e, onChange)}
                            placeholder="Check-in - Checkout"
                          />
                        </div>
                      );
                    }}
                  />
                )}
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
                    toDate(watchDateRange?.startDate || ""),
                    toDate(watchDateRange?.endDate || "")
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
