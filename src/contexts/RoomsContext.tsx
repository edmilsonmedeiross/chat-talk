"use client";
import { getRoomsToLocalStorage } from "@/lib/utils";
import { createContext, useContext, useEffect, useState } from "react";

export type Room = {
  id: string;
  name: string;
  isPrivate: "private" | "public";
};

export type RoomsContextType = {
  rooms: Room[];
  setRooms: React.Dispatch<React.SetStateAction<Room[]>>;
};

const RoomsContext = createContext({});
const chatData = [
  {
    id: "1",
    name: "Sala 1",
    isPrivate: "public",
  },
  {
    id: "2",
    name: "Sala 2",
    isPrivate: "public",
  },
];

export function useRoomsContext() {
  return useContext(RoomsContext);
}

export function RoomsProvider({ children }: { children: React.ReactNode }) {
  const [rooms, setRooms] = useState<Room[]>(chatData as Room[]);

  useEffect(() => {
    const rooms = getRoomsToLocalStorage(chatData);
    if (rooms) {
      setRooms(rooms);
    }
  }, []);

  return (
    <RoomsContext.Provider value={{ rooms, setRooms }}>
      {children}
    </RoomsContext.Provider>
  );
}
