"use client";

import { useGlobalStateContext } from "../context/global-state-context";

const WordCounter = () => {
  const { prompt, guessWordCount } = useGlobalStateContext();

  const wordBlocks = new Array(prompt.split(" ").length).fill(0);

  return (
    <div className='flex items-center justify-center w-full h-4 max-w-2xl my-1 px-2 text-xs bg-none'>
      {wordBlocks.map((word, index) => {
        if (index + 1 < guessWordCount) {
          return (
            <div
              key={index}
              className='h-2 w-12 mx-2 rounded bg-slate-500 animate-pulse'
            />
          );
        } else if (index + 1 === guessWordCount) {
          return (
            <div
              key={index}
              className='h-2 w-12 mx-2 rounded bg-slate-500 animate-pulse'
            />
          );
        } else {
          return <div key={index} className='hidden h-2 w-12 mx-2 rounded' />;
        }
      })}
    </div>
  );
};

export default WordCounter;
