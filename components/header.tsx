import Image from "next/image";
import React from "react";

const Header = () => {
  return (
    <header className="border-b-2 border-[#eff1f5]  px-6 py-8 flex justify-between items-center">
      <div className="flex items-center gap-2">
        <div className="flex flex-col items-center">
          <div className="flex gap-1">
            <div className="w-3 h-6 bg-black"></div>
            <div className="w-3 h-6 bg-black"></div>
            <div className="w-3 h-6 bg-black"></div>
          </div>
        </div>
        <h1 className="text-2xl font-bold">WhatBytes</h1>
      </div>
      <div className="flex items-center gap-2 p-2 rounded-lg border-3 border-[#eff1f5]">
        <div className="h-8 w-8 rounded-full overflow-hidden">
          <div className="relative w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
            <svg
              className="absolute w-12 h-12 text-gray-400 -left-1"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </div>
        </div>
        <span className="font-bold">Rahil Siddique</span>
      </div>
    </header>
  );
};

export default Header;
