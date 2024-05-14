import { useMemo } from "react";
import { Controller, useForm } from "react-hook-form";
import { getDaysBetweenDates } from "../../utils/date";
import { DateValueType } from "react-tailwindcss-datepicker";
import { createSearchParams, useNavigate } from "react-router-dom";
import { areIntervalsOverlapping, formatDate } from "date-fns";
import { TProperty } from "../../types";
import { Card, List, Button } from "flowbite-react";
import { DateRangePicker } from "../../components/DateRangePicker";
import { toUSD } from "../../utils/currency";

interface PropertyFormProps {
  property: TProperty;
}

type Inputs = {
  dateRange: DateValueType;
};

const PropertyForm = ({ property }: PropertyFormProps) => {
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
    setError,
    clearErrors,
  } = useForm<Inputs>();

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

    if (!isAvailable) {
      setError("dateRange", {
        type: "custom",
        message: "Property is not available for the selected dates",
      });
      return;
    }

    console.log("data", data);

    navigate({
      pathname: `/bookings/add/${property.id}`,
      search: createSearchParams({
        start: formatDate(startDate, "yyyy-MM-dd"),
        end: formatDate(endDate, "yyyy-MM-dd"),
      }).toString(),
    });
  };

  return (
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
              <div className="flex flex-col space-y-2 w-full">
                <DateRangePicker
                  value={value}
                  setValue={(e) => {
                    console.log("e", e);
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
        <Button type="submit" color="blue" pill size="md" className="self-end">
          Book now
        </Button>
      </Card>
    </form>
  );
};

export default PropertyForm;
