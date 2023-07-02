export const getDateIntervalMessage = (intervalInDays: number): string => {
  if (intervalInDays >= 365) {
    const years = Math.floor(intervalInDays / 365);
    return years === 1 ? 'Applied a year ago' : `Applied ${years} years ago`;
  } else if (intervalInDays >= 30) {
    const months = Math.floor(intervalInDays / 30);
    return months === 1
      ? 'Applied a month ago'
      : `Applied ${months} months ago`;
  } else if (intervalInDays >= 7) {
    const weeks = Math.floor(intervalInDays / 7);
    return weeks === 1 ? 'Applied a week ago' : `Applied ${weeks} weeks ago`;
  } else if (intervalInDays >= 1) {
    return intervalInDays === 1
      ? 'Applied a day ago'
      : `Applied ${intervalInDays} days ago`;
  } else {
    return 'Applied today';
  }
};
