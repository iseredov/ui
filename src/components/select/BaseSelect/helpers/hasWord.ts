export const hasWord = (findedWord: string, checkedWord = '') =>
  checkedWord.indexOf(findedWord) >= 0;
