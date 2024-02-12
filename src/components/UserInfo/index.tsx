import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FaUser } from "react-icons/fa6";
import { getSessionData } from "@/app/actions";

async function UserInfo() {
  const sessionData = await getSessionData();

  return (
    <div className="flex flex-col w-full justify-evenly items-center border-2">
      <Avatar className="w-28 h-28">
        <AvatarImage src="https://randomuser.me/api/portraits" />
        <AvatarFallback>
          <FaUser size={60} />
        </AvatarFallback>
      </Avatar>
      <h1 className="text-3xl">
        Bem Vindo ao{" "}
        <span className="font-extrabold text-3xl">
          <span className="font-extrabold text-green-600">Chat</span>-
          <span className="font-extrabold text-purple-600">Talk</span>
        </span>{" "}
        {sessionData?.username}!
      </h1>
    </div>
  );
}

export default UserInfo;
