const subtractDays = ({currentDate, daysToSubtract}) => {
  let endDate = new Date(currentDate.setUTCHours(23, 59, 59, 0));
    
  let startDate = new Date(currentDate.setUTCDate(currentDate.getUTCDate() - daysToSubtract));
  startDate.setUTCHours(0, 0, 0, 0);

  return `${startDate.toISOString()} ${endDate.toISOString()}`;
};
const subtractMonths = ({currentDate, monthsToSubtract}) => {
  let endDate = new Date(currentDate.setUTCHours(23, 59, 59, 0));
    
  let startDate = new Date(currentDate.setUTCMonth(currentDate.getUTCMonth() - monthsToSubtract));
  startDate.setUTCHours(0, 0, 0, 0);

  return `${startDate.toISOString()} ${endDate.toISOString()}`;
};
const subtractYears = ({currentDate, yearsToSubtract}) => {
  let endDate = new Date(currentDate.setUTCHours(23, 59, 59, 0));
    
  let startDate = new Date(currentDate.setUTCFullYear(currentDate.getUTCFullYear() - yearsToSubtract));
  startDate.setUTCHours(0, 0, 0, 0);

  return `${startDate.toISOString()} ${endDate.toISOString()}`;
};

const CONVERT_DATE = {
  defaultCase: (currentDate) => `${currentDate.toISOString()} ${currentDate.toISOString()}`,
  day: (currentDate) => {
    let startDate = new Date(currentDate.setUTCHours(0, 0, 0, 0));
    let endDate = new Date(currentDate.setUTCHours(23, 59, 59, 0));
      
    return `${startDate.toISOString()} ${endDate.toISOString()}`;
  },
  week: (currentDate) => subtractDays({currentDate, daysToSubtract: 7}),
  fortnight: (currentDate) => subtractDays({currentDate, daysToSubtract: 15}),
  month: (currentDate) => subtractMonths({currentDate, monthsToSubtract: 1}),
  bimester: (currentDate) => subtractMonths({currentDate, monthsToSubtract: 2}),
  trimester: (currentDate) => subtractMonths({currentDate, monthsToSubtract: 3}),
  quarter: (currentDate) => subtractMonths({currentDate, monthsToSubtract: 4}),
  semester: (currentDate) => subtractMonths({currentDate, monthsToSubtract: 6}),
  year: (currentDate) => subtractYears({currentDate, yearsToSubtract: 1})
};
export const handleConvertDate = (caseDate) => {
  let currentDate = new Date();
  
  const dateToReturn = CONVERT_DATE[caseDate] || CONVERT_DATE.defaultCase;
  
  return dateToReturn(currentDate);
};