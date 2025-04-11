"use client";

import { useGlobalStateContext } from "../context/global-state-context";

function GameContainer() {
  const { prompt, imgUrl } = useGlobalStateContext();

  console.log(prompt);
  console.log(imgUrl);

  return <div>GameContainer</div>;
}

export default GameContainer;
