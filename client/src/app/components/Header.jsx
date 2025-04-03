"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

const Header = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const router = useRouter();

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleLogout = () => {
    Cookies.remove("accessToken");

    router.push("/Login");
  };

  return (
    <div className="flex items-center justify-between p-4 bg-[#020D07]">
      <Link href="/">
        <div className="flex items-center gap-1">
          <div className="w-8 h-8">
            <Image
              src="/images/logo-icon.svg"
              alt="CodeMentor AI Logo"
              width={32}
              height={32}
            />
          </div>
          <h1 className="text-[28px] font-bold text-[#60AC84] font-sans leading-none tracking-tighter">
            CodeMentor AI
          </h1>
        </div>
      </Link>
      <div className="relative">
        <div
          className="flex items-center cursor-pointer"
          onClick={toggleDropdown}
        >
          <div className="w-8 h-8 rounded-full overflow-hidden border border-gray-300">
            <Image
              src="/images/avatar.png" // Replace with your avatar image path
              alt="User Avatar"
              width={32}
              height={32}
            />
          </div>
        </div>
        {dropdownOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-10">
            <Link href="/profile">
              <div className="px-4 py-2 text-black hover:bg-gray-200 rounded-lg">
                Profile
              </div>
            </Link>
            <div
              className="px-4 py-2 text-black hover:bg-gray-200 rounded-lg cursor-pointer"
              onClick={handleLogout}
            >
              Logout
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
