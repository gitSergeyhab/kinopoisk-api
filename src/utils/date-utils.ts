const YEAR_INTERVAL = 25;

export const getStartRangeYears = () => {
  const currentYear = +(new Date().toISOString().slice(0, 4));
  const startYear = currentYear - YEAR_INTERVAL;
  return {startYear, endYear: currentYear};
};
