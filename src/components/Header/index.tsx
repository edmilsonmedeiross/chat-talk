import React from "react";

function Header() {
  return (
    <header className="flex items-center p-4 w-full h-40 bg-[#181d2a]">
      <h1>
        <span className="font-extrabold text-xl">
          <span className="text-green-500">Chat</span>
          <span className="text-white">-</span>
          <span className="text-purple-500">Talk</span>
        </span>
      </h1>
    </header>
  );
}

export default Header;
