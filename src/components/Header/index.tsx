"use client";
import { MobileContextType, useMobileContext } from "@/contexts/MobileContext";
import React from "react";
import { FaBars } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

function Header() {
  const { isMobile, setIsMobile } = useMobileContext() as MobileContextType;
  return (
    <>
      {isMobile ? (
        <></>
      ) : (
        <header className="flex items-center p-4 w-full h-40 bg-[#181d2a]">
          <h1>
            <span className="font-extrabold text-xl">
              <span className="text-green-500">Chat</span>
              <span className="text-white">-</span>
              <span className="text-purple-500">Talk</span>
            </span>
          </h1>
          <div className="flex items-center gap-4 ml-auto">
            {isMobile ? (
              <IoClose
                onClick={() => {
                  setIsMobile(false);
                }}
                className="text-white text-2xl"
              />
            ) : (
              <FaBars
                onClick={() => {
                  setIsMobile(true);
                }}
                className="text-white text-2xl md:hidden"
              />
            )}
          </div>
        </header>
      )}
    </>
  );
}

export default Header;
