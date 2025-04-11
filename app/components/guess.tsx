"use client";

import { useCallback, useEffect, useState } from "react";

const Guess = ({ guess, prompt }: { guess: _Guess; prompt: string }) => {
  const [comparisonResults, setComparisonResults] = useState<_WordComparison[]>(
    []
  );

  const checkGuess = useCallback(() => {
    if (!guess.body) {
      return;
    }
    const guessWords = guess.body.split(" ");
    const promptWords = prompt.split(" ");

    const formattedPromptWords = promptWords.map((word) => {
      if (word[word.length - 1] === ".") {
        word = word.slice(0, -1);
      }

      return word.toLowerCase();
    });

    const formattedGuessWords = guessWords.map((word) => {
      if (word[word.length - 1] === ".") {
        word = word.slice(0, -1);
      }

      return word.toLowerCase();
    });

    const comparisonResults = formattedGuessWords.map((word, index) => {
      const wordComparison = {
        text: word,
        status: "incorrect",
      };

      if (word === formattedPromptWords[index]) {
        wordComparison.status = "correct";
      } else if (formattedPromptWords.includes(word)) {
        wordComparison.status = "partial";
      } else {
        wordComparison.status = "incorrect";
      }

      return wordComparison;
    });

    setComparisonResults(comparisonResults);
  }, [guess.body, prompt]);

  useEffect(() => {
    checkGuess();
  }, [checkGuess]);

  return (
    <div className='flex items-center justify-center w-full h-8 my-1 py-2 px-2 text-xs bg-slate-700'>
      {comparisonResults.map((wordComparison, index) => (
        <span
          key={index}
          className={`${
            wordComparison.status === "correct"
              ? "text-green-500 font-bold"
              : wordComparison.status === "partial"
              ? "text-yellow-500 font-bold"
              : "text-white"
          }`}
        >
          {`${
            index === 0
              ? wordComparison.text[0].toUpperCase() +
                wordComparison.text.slice(1)
              : wordComparison.text
          }\u00A0`}
        </span>
      ))}
    </div>
  );
};

export default Guess;
