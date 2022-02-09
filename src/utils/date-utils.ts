export const getEndYearFromNow = () =>  +(new Date().toISOString().slice(0, 4)) + 1;
