"use client";
import React, { useEffect, useState } from "react";
import RoonsList from "../RoonsList";
import { getRoomsToLocalStorage } from "@/lib/utils";

const chatData = [
  {
    id: 1,
    name: "Sala 1",
    messages: [
      { id: 1, user: "João", message: "Olá!" },
      { id: 2, user: "Maria", message: "Oi, João!" },
    ],
  },
  {
    id: 2,
    name: "Sala 2",
    messages: [{ id: 1, user: "Carlos", message: "Boa tarde!" }],
  },
];

function SideBar() {
  const [roomsToRender, setRooms] = useState<any[]>(chatData);

  useEffect(() => {
    setRooms(getRoomsToLocalStorage(chatData));
  }, []);

  return <RoonsList rooms={roomsToRender} setRooms={setRooms} />;
}

export default SideBar;
