import { getRandomWord } from './getRandomWord';

export const getRandomSentence = (maxLength: number): string => {
  let sentence = '';
  let spaceLeft = maxLength;

  while (spaceLeft > 0) {
    const word = getRandomWord(spaceLeft);
    if (sentence.length + word.length + 1 > maxLength) break; // +1 for space
    sentence += (sentence.length > 0 ? ' ' : '') + word;
    spaceLeft = maxLength - sentence.length;
  }

  return sentence;
};
