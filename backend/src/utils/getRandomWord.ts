export const getRandomWord = (maxLength: number): string => {
  const letters = 'abcdefghijklmnopqrstuvwxyz';
  const wordLength = Math.floor(Math.random() * maxLength) + 1; // At least 1 letter
  let word = '';
  for (let i = 0; i < wordLength; i++) {
    const letter = letters[Math.floor(Math.random() * letters.length)];
    word += letter;
  }
  return word;
};
