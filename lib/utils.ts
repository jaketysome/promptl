export function countWords(str: string): number {
  return str.split(/\s+/).filter((word) => word !== "").length;
}

export function extractWords(str: string): string[] {
  if (!str) return [];

  const words = str.split(" ").filter((word) => word.length > 0);

  return words.map((word) => removePunctuation(word.toLowerCase()));
}

export function compareWords(
  guessWords: string[],
  promptWords: string[]
): _GuessResult[] {
  if (guessWords.length < 1 || promptWords.length < 1) return [];

  return guessWords.map((guessWord, i) => {
    const promptWord = promptWords[i];

    if (guessWord === promptWord) {
      return { text: guessWord, status: "correct" };
    } else if (promptWords.includes(guessWord)) {
      return { text: guessWord, status: "partial" };
    } else {
      return { text: guessWord, status: "incorrect" };
    }
  });
}

export function removePunctuation(str: string) {
  return str
    .split("")
    .filter((char) => {
      return /[a-zA-Z0-9 ]/.test(char);
    })
    .join("");
}

export function formatGuessWords(
  word: string,
  guessLength: number,
  index: number
) {
  if (!word) return "";

  const spacing = index === guessLength - 1 ? "" : "\u00A0";

  if (index === 0) {
    return `${word[0].toUpperCase() + word.slice(1)}${spacing}`;
  } else {
    return `${word}${spacing}`;
  }
}

export function checkWinCondition(guessResults: _GuessResult[]) {
  if (guessResults.length < 1) return false;

  const isCorrect = (guessResult: _GuessResult) =>
    guessResult.status === "correct";

  return guessResults.every(isCorrect);
}
