import { generatePromptAndImage } from "@/lib/openai";
import { GlobalStateContextProvider } from "../context/global-state-context";
import Clue from "./clue";
import GeneratedImage from "./generated-img";
import GuessControls from "./guess-controls";
import GuessList from "./guess-list";
import WordCounter from "./word-counter";
import Notify from "./notify";

const _TEST_RESPONSE: _OpenAIResponse = {
  success: true,
  body: {
    prompt: "A futuristic city skyline at sunset.",
    imgUrl:
      "https://oaidalleapiprodscus.blob.core.windows.net/private/org-rVsgDY5zjFseSqZ7HmQ7ldmu/user-K7D0m5jE4sTUxVLtOW6rlEwH/img-t9nD4j5RnPK22cPGXl7dcGxi.png?st=2025-06-10T10%3A26%3A48Z&se=2025-06-10T12%3A26%3A48Z&sp=r&sv=2024-08-04&sr=b&rscd=inline&rsct=image/png&skoid=475fd488-6c59-44a5-9aa9-31c4db451bea&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-06-10T10%3A45%3A07Z&ske=2025-06-11T10%3A45%3A07Z&sks=b&skv=2024-08-04&sig=VbWKjaRdjMlQa5l7%2B8UbiQBJI1uYZk6bos7FX2p5m%2B4%3D",
  },
};

async function GameContainer() {
  const isDev =
    process.env.VERCEL_ENV !== "production" &&
    process.env.NODE_ENV !== "production";

  const response = isDev ? _TEST_RESPONSE : await generatePromptAndImage();

  if (!response.success) return null;

  const { imgPath, prompt } = response.body;

  return (
    <div className='flex flex-col w-full max-w-md h-full items-start justify-center border-1 border-slate-400'>
      <GeneratedImage {...{ imgPath, prompt }} />
      <GlobalStateContextProvider response={response}>
        <Notify />
        <Clue />
        <GuessList />
        <WordCounter />
        <GuessControls />
      </GlobalStateContextProvider>
    </div>
  );
}

export default GameContainer;
