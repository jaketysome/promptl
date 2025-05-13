"use client";

import { compareWords, extractWords, formatGuessWords } from "@/lib/utils";
import { useCallback, useEffect, useState } from "react";
import clsx from "clsx";

const renderGuessResults = (guessResults: _WordComparison[]) => {
  return guessResults.map((result, index) => (
    <span
      key={index}
      className={clsx(
        result.status === "correct" && "text-green-500 font-bold",
        result.status === "partial" && "text-yellow-500 font-bold",
        result.status === "incorrect" && "text-white"
      )}
    >
      {formatGuessWords(result.text, guessResults.length, index)}
    </span>
  ));
};

const Guess = ({ guess, prompt }: { guess: _Guess; prompt: string }) => {
  const [guessResults, setGuessResults] = useState<_WordComparison[]>([]);

  const checkGuess = useCallback(() => {
    if (!guess.body) return;

    const guessWords = extractWords(guess.body);
    const promptWords = extractWords(prompt);

    setGuessResults(compareWords(guessWords, promptWords));
  }, [guess.body, prompt]);

  useEffect(() => {
    checkGuess();
  }, [checkGuess]);

  return (
    <div className='flex items-center justify-center w-full h-8 my-1 py-2 px-2 text-xs bg-slate-700'>
      {renderGuessResults(guessResults)}
    </div>
  );
};

export default Guess;
