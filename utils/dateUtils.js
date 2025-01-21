export const getStartOfPayrollPeriod = (date) => {
  const startOfPayrollPeriod = new Date(date);
  const day = startOfPayrollPeriod.getDay();
  const diff = startOfPayrollPeriod.getDate() - day + (day >= 4 ? 4 : -3); // Ajustar para que el jueves sea el inicio
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
