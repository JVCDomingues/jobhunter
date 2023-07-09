import { getDateIntervalMessage } from './getIntervalMessage';

describe('Get interval message helper', () => {
  it('should return the correct message for today', () => {
    const differenceInDays = 0;
    expect(getDateIntervalMessage(differenceInDays)).toEqual('Today');
  });
  it('should return the correct message in days', () => {
    const differenceInDays = 5;
    expect(getDateIntervalMessage(differenceInDays)).toEqual('5 days ago');
  });
  it('should return the correct message in weeks', () => {
    const differenceInDays = 12;
    expect(getDateIntervalMessage(differenceInDays)).toEqual('a week ago');
  });
  it('should return the correct message in months', () => {
    const differenceInDays = 40;
    expect(getDateIntervalMessage(differenceInDays)).toEqual('a month ago');
  });
  it('should return the correct message in years', () => {
    const differenceInDays = 400;
    expect(getDateIntervalMessage(differenceInDays)).toEqual('a year ago');
  });
});
