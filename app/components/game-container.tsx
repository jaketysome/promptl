"use client";

import { useGlobalStateContext } from "../context/global-state-context";

function GameContainer() {
  const { prompt, imgUrl } = useGlobalStateContext();

  console.log(prompt);
  console.log(imgUrl);

  return (
    <div className='flex flex-col w-full max-w-md h-full items-start justify-center border-1'>
      GAME CONTAINER
    </div>
  );
}

export default GameContainer;
