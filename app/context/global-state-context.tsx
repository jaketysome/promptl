"use client";

import {
  useContext,
  createContext,
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
} from "react";

interface GlobalStateContext {
  prompt: string;
  imgUrl: string;
  guessList: Guess[];
  setGuessList: Dispatch<SetStateAction<Guess[]>>;
  guessCount: number;
  setGuessCount: Dispatch<SetStateAction<number>>;
  revealClue: boolean;
  setRevealClue: Dispatch<SetStateAction<boolean>>;
  wordCount: number;
  setWordCount: Dispatch<SetStateAction<number>>;
}

const GlobalStateContext = createContext<GlobalStateContext>({
  prompt: "",
  imgUrl: "",
  guessList: [],
  setGuessList: () => {},
  guessCount: 0,
  setGuessCount: () => {},
  revealClue: false,
  setRevealClue: () => {},
  wordCount: 0,
  setWordCount: () => {},
});

const initialGuessList = [
  { id: 6 },
  { id: 5 },
  { id: 4 },
  { id: 3 },
  { id: 2 },
  { id: 1 },
];

export const GlobalStateContextProvider = ({
  response,
  children,
}: {
  response: OpenAIResponse<{ body: ResponseBody }>;
  children: React.ReactNode;
}) => {
  const [prompt, setPrompt] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [guessList, setGuessList] = useState(initialGuessList);
  const [guessCount, setGuessCount] = useState(0);
  const [revealClue, setRevealClue] = useState(false);
  const [wordCount, setWordCount] = useState(0);

  useEffect(() => {
    if (response.success) {
      setPrompt(response.body.prompt);
      setImgUrl(response.body.imgUrl);
    } else {
      console.error("Error generating prompt and imgUrl");
    }
  }, []);

  return (
    <GlobalStateContext.Provider
      value={{
        prompt,
        imgUrl,
        guessList,
        setGuessList,
        guessCount,
        setGuessCount,
        revealClue,
        setRevealClue,
        wordCount,
        setWordCount,
      }}
    >
      {children}
    </GlobalStateContext.Provider>
  );
};

export const useGlobalStateContext = () => {
  const context = useContext(GlobalStateContext);

  if (!context)
    throw new Error(
      "useGlobalStateContext must be used within a GlobalStateContextProvider!"
    );

  return context;
};
