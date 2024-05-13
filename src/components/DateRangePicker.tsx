import Datepicker, { DateValueType } from "react-tailwindcss-datepicker";
import { useMediaQuery } from "react-responsive";

interface DateRangePickerProps {
  value: DateValueType;
  setValue: (value: DateValueType) => void;
  placeholder?: string;
}

export function DateRangePicker({
  value,
  setValue,
  placeholder,
}: DateRangePickerProps) {
  const isMobile = useMediaQuery({ query: "(max-width: 640px)" });

  if (!value) {
    value = {
      startDate: new Date(),
      endDate: new Date().setMonth(11).toString(),
    };
  }

  const handleValueChange = (newValue: DateValueType) => {
    setValue(newValue);
  };

  return (
    <Datepicker
      value={value}
      onChange={handleValueChange}
      showFooter={true}
      separator="until"
      useRange={!isMobile}
      placeholder={placeholder}
      readOnly
      dateLooking="forward"
      popoverDirection={isMobile ? "up" : undefined}
      displayFormat={"DD MMMM YYYY"}
    />
  );
}
