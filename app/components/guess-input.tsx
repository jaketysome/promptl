"use client";

import { SetStateAction } from "react";
import { Dispatch } from "react";

function GuessInput({
  currentGuess,
  setCurrentGuess,
}: {
  currentGuess: string;
  setCurrentGuess: Dispatch<SetStateAction<string>>;
}) {
  return (
    <input
      type='text'
      placeholder='Guess the prompt...'
      className='flex w-full h-8 my-1 p-1 text-center bg-white'
      value={currentGuess}
      onChange={(e) => setCurrentGuess(e.target.value)}
    />
  );
}

export default GuessInput;
