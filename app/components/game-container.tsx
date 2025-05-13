import { generatePromptAndImage } from "@/lib/openai";
import { GlobalStateContextProvider } from "../context/global-state-context";
import Clue from "./clue";
import GeneratedImage from "./generated-img";
import GuessInput from "./guess-input";
import GuessList from "./guess-list";
import WordCounter from "./word-counter";

const _TEST_RESPONSE: _OpenAIResponse = {
  success: true,
  body: {
    prompt: '"A spaceship landing on a vibrant alien planet."',
    imgUrl:
      "https://oaidalleapiprodscus.blob.core.windows.net/private/org-rVsgDY5zjFseSqZ7HmQ7ldmu/user-K7D0m5jE4sTUxVLtOW6rlEwH/img-3u0RXITopuJjMZSFlnfeyh6C.png?st=2025-04-11T09%3A29%3A20Z&se=2025-04-11T11%3A29%3A20Z&sp=r&sv=2024-08-04&sr=b&rscd=inline&rsct=image/png&skoid=d505667d-d6c1-4a0a-bac7-5c84a87759f8&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-04-10T20%3A40%3A16Z&ske=2025-04-11T20%3A40%3A16Z&sks=b&skv=2024-08-04&sig=xWXmHTQZlvOVhh/gnTcf8cOyxJ9LUVWXZ1XKr8xaLXg%3D",
  },
};

async function GameContainer() {
  const response = _TEST_RESPONSE;

  if (!response.success) return null;

  const { imgUrl, prompt } = response.body;

  return (
    <div className='flex flex-col w-full max-w-md h-full items-start justify-center border-1 border-slate-400'>
      <GeneratedImage {...{ imgUrl, prompt }} />
      <GlobalStateContextProvider response={response}>
        <Clue />
        <GuessList />
        <WordCounter />
        <GuessInput />
      </GlobalStateContextProvider>
    </div>
  );
}

export default GameContainer;
