"use client";

import { useState } from "react";
import Image from "next/image";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile Sidebar Toggle Button */}
      <button
        onClick={(e) => {e.stopPropagation();setIsOpen(!isOpen)}}
        className="lg:hidden p-2 fixed top-4 left-4 bg-gray-200 rounded-md z-50"
      >
        <Image
          src="https://cdn-icons-png.flaticon.com/512/1828/1828859.png"
          alt="menu"
          width={25}
          height={25}
        />
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed lg:static top-0 left-0 h-full w-60 bg-white border-r-2 border-[#eff1f5] transition-transform ${
          isOpen ? "translate-x-0 z-42" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        <nav className="pr-4 py-4 space-y-4 font-bold mt-8">
          <a
            href="#"
            className="flex items-center gap-4 p-4 rounded-tr-3xl rounded-br-3xl text-[#525d6b] hover:bg-gray-100"
          >
            <Image
              width={17}
              height={17}
              src="https://cdn-icons-png.flaticon.com/512/2152/2152656.png"
              alt="dashboard"
            />
            <span>Dashboard</span>
          </a>
          <a
            href="#"
            className="flex items-center gap-4 p-4 rounded-tr-3xl rounded-br-3xl bg-gray-100 text-[#3f51c4]"
          >
            <div className="text-[#3f51c4]">
              <Image width={20} height={20} src="/icons/skill-icon.png" alt="skills" />
            </div>
            <span>Skill Test</span>
          </a>
          <a
            href="#"
            className="flex items-center gap-4 p-4 rounded-tr-3xl rounded-br-3xl text-[#525d6b] hover:bg-gray-100"
          >
            <Image
              width={20}
              height={20}
              src="https://cdn-icons-png.flaticon.com/512/4288/4288123.png"
              alt="docs"
            />
            <span>Internship</span>
          </a>
        </nav>
      </aside>

      {/* Click outside to close sidebar (Mobile Only) */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-41 lg:hidden"
          onClick={(e) => {e.stopPropagation(); setIsOpen(false)}}
        ></div>
      )}
    </>
  );
};

export default Sidebar;
