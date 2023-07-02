import { parseISO, differenceInDays } from 'date-fns';

export const getDateDifference = (date: string, currentDate: Date) => {
  const parsedDate = parseISO(date);
  return differenceInDays(parsedDate, currentDate) * -1;
};
