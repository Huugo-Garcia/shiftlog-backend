import { format, differenceInHours, differenceInMinutes } from "date-fns";

export const calculateWorkedHours = (start, end) => {
  const startDate = new Date(start);
  const endDate = new Date(end);
  const hours = differenceInHours(endDate, startDate);
  const minutes = differenceInMinutes(endDate, startDate) % 60;
  return `${hours}h ${minutes}m`;
};