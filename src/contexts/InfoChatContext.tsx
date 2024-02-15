"use client";
import { createContext, useContext, useState } from "react";

export type InfoChatContextType = {
  isUpdate: boolean;
  setIsUpdate: React.Dispatch<React.SetStateAction<boolean>>;
};

const InfoChatContext = createContext<InfoChatContextType | undefined>(
  undefined
);

export function useInfoChatContext() {
  return useContext(InfoChatContext);
}

export function InfoChatProvider({ children }: { children: React.ReactNode }) {
  const [isUpdate, setIsUpdate] = useState<boolean>(false);

  return (
    <InfoChatContext.Provider value={{ isUpdate, setIsUpdate }}>
      {children}
    </InfoChatContext.Provider>
  );
}
