import { generatePromptAndImage } from "@/lib/openai";
import { GlobalStateContextProvider } from "./context/global-state-context";
import GameContainer from "./components/game-container";

export default async function Home() {
  const response = await generatePromptAndImage();

  return (
    <GlobalStateContextProvider response={response}>
      <main>
        <GameContainer />
      </main>
    </GlobalStateContextProvider>
  );
}
