"use client";

import { useContext, createContext, useState, useEffect } from "react";

interface GlobalStateContext {
  prompt: string;
  imgUrl: string;
  guessList: Guess[];
}

const GlobalStateContext = createContext<GlobalStateContext>({
  prompt: "",
  imgUrl: "",
  guessList: [],
});

export const GlobalStateContextProvider = ({
  response,
  children,
}: {
  response: OpenAIResponse<{ body: ResponseBody }>;
  children: React.ReactNode;
}) => {
  const [prompt, setPrompt] = useState<string>("");
  const [imgUrl, setImgUrl] = useState<string>("");
  const [guessList, setGuessList] = useState<Guess[]>([
    { id: 6 },
    { id: 5 },
    { id: 4 },
    { id: 3 },
    { id: 2 },
    { id: 1 },
  ]);

  useEffect(() => {
    if (response.success) {
      setPrompt(response.body.prompt);
      setImgUrl(response.body.imgUrl);
    } else {
      console.error("Error generating prompt and imgUrl");
    }
  }, []);

  return (
    <GlobalStateContext.Provider value={{ prompt, imgUrl, guessList }}>
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
