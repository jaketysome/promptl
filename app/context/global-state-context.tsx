"use client";

import { useContext, createContext, useState, useEffect } from "react";

interface GlobalStateContext {
  prompt: string;
  imgUrl: string;
}

const GlobalStateContext = createContext<GlobalStateContext>({
  prompt: "",
  imgUrl: "",
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

  useEffect(() => {
    if (response.success) {
      setPrompt(response.body.prompt);
      setImgUrl(response.body.imgUrl);
    } else {
      console.error("Error generating prompt and imgUrl");
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
