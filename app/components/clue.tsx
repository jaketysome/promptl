"use client";

import { useEffect, useState } from "react";
import { useGlobalStateContext } from "../context/global-state-context";

const Clue = () => {
  const { prompt, revealClue } = useGlobalStateContext();
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    setIsRevealed(revealClue);
  }, [revealClue]);

  const promptWords = prompt.split(" ");
  const clueWords = promptWords.map((word) => {
    if (word.length < 6) {
      return word
        .split("")
        .map((letter) => "_")
        .join("");
    } else {
      return (
        word[0] +
        word
          .slice(1, -1)
          .split("")
          .map((letter) => "_")
          .join("")
      );
    }
  });

  return (
    <>
      {isRevealed && (
        <div className='flex w-full items-center justify-center'>
          {clueWords.map((word, index) => (
            <span key={index} className='text-white'>
              {word + "\u00A0"}
            </span>
          ))}
        </div>
      )}
    </>
  );
};

export default Clue;
