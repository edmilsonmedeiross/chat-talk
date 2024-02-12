import React from "react";
import { IoCodeSharp } from "react-icons/io5";
import { IoCodeSlash } from "react-icons/io5";

function Footer() {
  return (
    <footer className="flex items-center gap-2 justify-center w-full h-20 bg-[#181d2a]">
      <h1 className="flex items-center text-white">
        Desenvolvido com amor por{" "}
      </h1>
      <span className="flex items-center gap-2 text-white">
        <IoCodeSharp color="yellow" size={18} /> edmilsonmedeiross{" "}
        <IoCodeSlash color="yellow" size={18} />
      </span>
    </footer>
  );
}

export default Footer;
