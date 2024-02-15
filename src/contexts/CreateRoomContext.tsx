"use client";
import { createContext, useContext, useState } from "react";

export type CreateRoomContextType = {
  isCreating: boolean;
  setIsCreating: React.Dispatch<React.SetStateAction<boolean>>;
};

const CreateRoomContext = createContext<CreateRoomContextType | undefined>(
  undefined
);

export function useCreateRommContext() {
  return useContext(CreateRoomContext);
}

export function CreateRoomProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isCreating, setIsCreating] = useState<boolean>(false);

  return (
    <CreateRoomContext.Provider value={{ isCreating, setIsCreating }}>
      {children}
    </CreateRoomContext.Provider>
  );
}
