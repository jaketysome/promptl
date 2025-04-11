"use client";

import Guess from "@/app/components/guess";
import { useGlobalStateContext } from "../context/global-state-context";

const GuessList = () => {
  const { prompt, guessList } = useGlobalStateContext();

  return (
    <div className='flex flex-col items-center justify-start w-full h-full mt-4'>
      {guessList.map((guess, index) => (
        <Guess key={index} guess={guess} prompt={prompt} />
      ))}
    </div>
  );
};

export default GuessList;
