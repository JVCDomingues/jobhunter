import { getDateDifference } from './getDateDifference';

describe('Get date difference', () => {
  const currentDate = new Date('2023-07-02T00:00:00.000Z');

  test('should return 0 when the date is the same as the current date', () => {
    const difference = getDateDifference(
      '2023-07-02T00:00:00.000Z',
      currentDate
    );
    expect(difference).toBe(-0);
  });

  test('should return 1 when the date is 1 day ago', () => {
    const difference = getDateDifference(
      '2023-07-01T00:00:00.000Z',
      currentDate
    );
    expect(difference).toBe(1);
  });

  test('should return 10 when the date is 10 days ago', () => {
    const difference = getDateDifference(
      '2023-06-22T00:00:00.000Z',
      currentDate
    );
    expect(difference).toBe(10);
  });
});
