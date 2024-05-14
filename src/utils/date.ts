// get the number of days between two dates (inclusive)
export const getDaysBetweenDates = (startDate: Date, endDate: Date) => {
  const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1 || 0;
};

export const formatDate = (date: Date): string => {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
};

export const toDate = (date: string | Date): Date => {
  const adjusted = new Date(date);
  return new Date(adjusted.getTime() - adjusted.getTimezoneOffset() * -60000);
};

export const isValidDate = (date: string | null | Date): boolean => {
  return date !== null && !isNaN(new Date(date).getTime());
};
