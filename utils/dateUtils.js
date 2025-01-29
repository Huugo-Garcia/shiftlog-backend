import { format, differenceInHours, differenceInMinutes } from "date-fns";

export const getStartOfPayrollPeriod = (date) => {
  const startOfPayrollPeriod = new Date(date);
  const day = startOfPayrollPeriod.getDay();
  const diff = startOfPayrollPeriod.getDate() - day + (day >= 4 ? 4 : -3);
  startOfPayrollPeriod.setDate(diff);
  startOfPayrollPeriod.setHours(0, 0, 0, 0);
  return startOfPayrollPeriod;
};

export const getEndOfPayrollPeriod = (date) => {
  const endOfPayrollPeriod = new Date(getStartOfPayrollPeriod(date));
  endOfPayrollPeriod.setDate(endOfPayrollPeriod.getDate() + 6);
  endOfPayrollPeriod.setHours(23, 59, 59, 999);
  return endOfPayrollPeriod;
};

export const calculateWorkedHours = (start, end) => {
  const startDate = new Date(start);
  const endDate = new Date(end);
  const hours = differenceInHours(endDate, startDate);
  const minutes = differenceInMinutes(endDate, startDate) % 60;
  return `${hours}h ${minutes}m`;
};