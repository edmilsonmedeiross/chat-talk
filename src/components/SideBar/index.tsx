import React from "react";
import RoonsList from "../RoonsList";

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
  return <RoonsList rooms={chatData} />;
}

export default SideBar;
