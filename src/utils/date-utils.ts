export const getEndYearFromNow = () =>  +(new Date().toISOString().slice(0, 4)) + 1;

export const formatDateDDMonthYYYY = (date: string) => new Date(date).toLocaleString('ru-Ru',{year: 'numeric', month: 'long', day: 'numeric'} );
