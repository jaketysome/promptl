"use client";

import {
  useContext,
  createContext,
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
  useCallback,
} from "react";

interface GlobalStateContext {
  prompt: string;
  imgUrl: string;
  guessList: _Guess[];
  setGuessList: Dispatch<SetStateAction<_Guess[]>>;
  guessCount: number;
  setGuessCount: Dispatch<SetStateAction<number>>;
  guessWordCount: number;
  setGuessWordCount: Dispatch<SetStateAction<number>>;
  revealClue: boolean;
  setRevealClue: Dispatch<SetStateAction<boolean>>;
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
  guessWordCount: 0,
  setGuessWordCount: () => {},
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
  response: _OpenAIResponse;
  children: React.ReactNode;
}) => {
  const [prompt, setPrompt] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [guessList, setGuessList] = useState(initialGuessList);
  const [guessCount, setGuessCount] = useState(0);
  const [guessWordCount, setGuessWordCount] = useState(0);
  const [revealClue, setRevealClue] = useState(false);

  const handleResponse = useCallback(() => {
    if (response.success) {
      setPrompt(response.body.prompt);
      setImgUrl(response.body.imgUrl);
      console.log("IMG URL: ", response.body.imgUrl);
    } else {
      console.error("Error generating prompt and imgUrl");
    }
  }, [response]);

  useEffect(() => {
    handleResponse();
  }, [handleResponse]);

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
        guessWordCount,
        setGuessWordCount,
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
