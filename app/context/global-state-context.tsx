"use client";

import { useContext, createContext, useState, useEffect } from "react";

interface GlobalStateContext {
  prompt: string | undefined;
  imgUrl: string | undefined;
}

const GlobalStateContext = createContext<GlobalStateContext>({
  prompt: undefined,
  imgUrl: undefined,
});

export const GlobalStateContextProvider = ({
  response,
  children,
}: {
  response: OpenAIResponse<{ body: ResponseBody }>;
  children: React.ReactNode;
}) => {
  const [prompt, setPrompt] = useState<string | undefined>(undefined);
  const [imgUrl, setImgUrl] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (response.success) {
      setPrompt(response.body.prompt);
      setImgUrl(response.body.imgUrl);
    }
  }, []);

  return (
    <GlobalStateContext.Provider value={{ prompt, imgUrl }}>
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
