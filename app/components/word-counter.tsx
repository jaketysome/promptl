"use client";

import clsx from "clsx";
import { useGlobalStateContext } from "../context/global-state-context";

function WordBlock({
  index,
  guessWordCount,
}: {
  index: number;
  guessWordCount: number;
}) {
  const isFilled = index + 1 <= guessWordCount;

  return (
    <div
      className={clsx(
        "h-3 w-12 mx-2 rounded border-1 border-slate-400",
        isFilled && "bg-slate-500 animate-pulse border-0"
      )}
    />
  );
}

const WordCounter = () => {
  const { prompt, guessWordCount } = useGlobalStateContext();

  const promptBlocks = new Array(prompt.split(" ").length).fill(0);

  return (
    <div className='flex items-center justify-center w-full h-4 max-w-2xl my-1 px-2 text-xs bg-none'>
      {promptBlocks.map((_, index) => (
        <WordBlock key={index} {...{ index, guessWordCount }} />
      ))}
    </div>
  );
};

export default WordCounter;
