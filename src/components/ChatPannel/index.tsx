"use client";
import React, { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { Input } from "../ui/input";
import { LuSendHorizonal } from "react-icons/lu";
import "./custom-scrollbar.css";
import "./styles.css";

type MessagesProps = {
  user: string;
  message: string;
};

type UserProps = {
  user: {
    username: string;
    email: string;
  };
};

interface FormData {
  message: string;
}

function ChatPannel({ user }: UserProps): JSX.Element {
  const [messages, setMessages] = useState<MessagesProps[]>([]);
  const { register, handleSubmit, setValue } = useForm<FormData>();
  const lastMessageRef = useRef<HTMLDivElement>(null);

  function handleResponseMessages() {
    const messageSystem = {
      user: "User",
      message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    };
    setMessages((prevMessages) => [...prevMessages, messageSystem]);
  }

  useEffect(() => {
    if (messages.length > 0 && messages[messages.length - 1].user !== "User") {
      setTimeout(() => {
        handleResponseMessages();
      }, 1000);
    }

    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const onSubmit = (data: FormData) => {
    const message = { user: user.username, message: data.message };
    if (!message.message.trim()) return;
    setMessages((prevMessages) => [...prevMessages, message]);
    setValue("message", "");
  };

  return (
    <div className="flex flex-col p-4 justify-between w-full max-w-96 h-full max-h-96 border-2 overflow-auto rounded-lg max-sm:max-w-64">
      {messages.length > 0 ? (
        messages.map((message, index) => (
          <div key={index} className="mb-6 bg-slate-300 p-2 rounded-xl">
            <p>
              <strong>{message.user}:</strong>
            </p>
            <p>{message.message}</p>
            {index === messages.length - 1 ? (
              <div ref={lastMessageRef} />
            ) : null}
          </div>
        ))
      ) : (
        <div className="flex justify-center items-center h-full">
          <p>Nenhuma mensagem</p>
        </div>
      )}
      <form
        className="flex justify-between p-2 max-sm:gap-2"
        onSubmit={handleSubmit(onSubmit)}
      >
        <input
          type="text"
          placeholder="Digite sua mensagem"
          className="custom-input border-none border-b border-gray-300 focus:border-gray-500 focus:ring-0 max-sm:w-44 max-sm:text-sm"
          {...register("message")}
        />
        <button type="submit" className="flex justify-center items-center">
          <LuSendHorizonal size={30} />
        </button>
      </form>
    </div>
  );
}

export default ChatPannel;
