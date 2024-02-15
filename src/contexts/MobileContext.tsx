"use client";
import { createContext, useContext, useState } from "react";

export type MobileContextType = {
  isMobile: boolean;
  setIsMobile: React.Dispatch<React.SetStateAction<boolean>>;
};

const MobileContext = createContext<MobileContextType | undefined>(undefined);

export function useMobileContext() {
  return useContext(MobileContext);
}

export function MobileProvider({ children }: { children: React.ReactNode }) {
  const [isMobile, setIsMobile] = useState<boolean>(false);

  return (
    <MobileContext.Provider value={{ isMobile, setIsMobile }}>
      {children}
    </MobileContext.Provider>
  );
}
