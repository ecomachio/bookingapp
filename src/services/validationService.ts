import { areIntervalsOverlapping, toDate } from "date-fns";
import { DEFAULT_DATE_VALIDATION_MESSAGE } from "../constants";
import { isValidDate } from "../utils/date";
import {
  FormInputs,
  TBooking,
  TBookingWithProperty,
  TProperty,
} from "../types";
import { DateValueType } from "react-tailwindcss-datepicker";

interface ValidationResult {
  isValid: boolean;
  message?: string;
}

interface ValidateBookingFormProps {
  data: FormInputs;
  property: TProperty;
  booking?: TBookingWithProperty | TBooking | undefined;
}

export const validateBookingForm = ({
  data,
  property,
  booking,
}: ValidateBookingFormProps): ValidationResult => {
  if (
    !data.dateRange ||
    !data.dateRange.startDate ||
    !data.dateRange.endDate ||
    !isValidDate(data.dateRange.startDate) ||
    !isValidDate(data.dateRange.endDate)
  ) {
    return {
      isValid: false,
      message: DEFAULT_DATE_VALIDATION_MESSAGE,
    };
  }

  const startDate = toDate(data.dateRange.startDate);
  const endDate = toDate(data.dateRange.endDate);

  const filterFn = booking?.id
    ? (b: TBooking): boolean => b.id !== Number(booking?.id)
    : () => true;

  const isAvailable = property.bookedDates
    ? property.bookedDates.filter(filterFn).every((booking) => {
        return !areIntervalsOverlapping(
          {
            start: toDate(booking.startDate),
            end: toDate(booking.endDate),
          },
          {
            start: toDate(startDate),
            end: toDate(endDate),
          },
          { inclusive: true }
        );
      })
    : true;

  if (!isAvailable) {
    return {
      isValid: false,
      message: "Property is not available for the selected dates",
    };
  }

  return {
    isValid: true,
  };
};

export const validateDateSelection = (e: DateValueType): ValidationResult => {
  if (e?.startDate && e?.endDate) return { isValid: true };

  return {
    isValid: false,
    message: DEFAULT_DATE_VALIDATION_MESSAGE,
  };
};
