export const validateNumberParams = (supposedNumbers: string[]): boolean => {
  for (const number in supposedNumbers) {
    if (isNaN(parseInt(number))) return false;
  }

  return true;
};
