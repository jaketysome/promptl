"use client";

import { useState } from "react";
import { countWords, updateGuessList } from "@/lib/utils";
import { useGlobalStateContext } from "../context/global-state-context";
import { useEffect } from "react";

const GuessInput = () => {
  const {
    prompt,
    guessList,
    guessCount,
    setGuessCount,
    setGuessList,
    setRevealClue,
    guessWordCount,
    setGuessWordCount,
  } = useGlobalStateContext();

  const [currentGuess, setCurrentGuess] = useState<string>("");
  const [isValidGuess, setIsValidGuess] = useState<boolean>(false);
  const [isDisabled, setIsDisabled] = useState(false);

  const promptLength = prompt.split(" ").length;

  useEffect(() => {
    setGuessWordCount(countWords(currentGuess));

    if (guessWordCount === promptLength) {
      setIsValidGuess(true);
    } else {
      setIsValidGuess(false);
    }
  }, [currentGuess]);

  const handleGuess = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (guessWordCount < promptLength) return;

    const updatedGuessList = updateGuessList(
      guessCount,
      currentGuess,
      guessList
    );

    setGuessList(updatedGuessList);
    setGuessCount(guessCount + 1);
    setGuessWordCount(0);
    setCurrentGuess("");
    setIsValidGuess(false);
    setIsDisabled(false);
  };

  const handleClear = () => {
    setCurrentGuess("");
    setGuessWordCount(0);
    setIsDisabled(false);
  };

  const handleClue = () => {
    setRevealClue(true);
  };

  return (
    <form
      onSubmit={handleGuess}
      className='flex flex-col w-full h-full text-xs text-black'
    >
      <input
        type='text'
        placeholder='Guess the prompt...'
        className='flex w-full h-8 my-1 p-1 text-center bg-white'
        value={currentGuess}
        disabled={isDisabled}
        onChange={(e) => setCurrentGuess(e.target.value)}
      />
      <div className='flex w-full h-8 my-1 items-center justify-center'>
        <button
          type='button'
          onClick={handleClue}
          disabled={guessCount < 3}
          className='flex items-center justify-center text-xs w-10 h-full bg-white disabled:text-gray-400 disabled:cursor-not-allowed'
        >
          ?
        </button>
        <button
          type='submit'
          disabled={!isValidGuess}
          className='flex h-full w-full items-center justify-center bg-slate-500 disabled:text-gray-400 disabled:cursor-not-allowed'
        >
          SUBMIT
        </button>
        <button
          type='button'
          onClick={handleClear}
          className='flex items-center justify-center text-xs w-10 h-full bg-white border-l-2 border-slate-500'
        >
          X
        </button>
      </div>
    </form>
  );
};

export default GuessInput;
