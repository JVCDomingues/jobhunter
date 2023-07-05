import { useRouter } from 'next/router';
import React from 'react';
import { FiLogOut } from 'react-icons/fi';

export default function Header() {
  const router = useRouter();

  return (
    <header className="bg-white border-b border-zinc-300 shadow px-4 md:px-11 py-3 flex flex-wrap justify-between items-center">
      <span className="text-xl">jobHunter</span>
      <nav className="flex items-center gap-5">
        <span className="hidden md:inline-block font-normal text-zinc-600 cursor-pointer">
          Home
        </span>
        <span className="hidden md:inline-block font-normal text-zinc-600 cursor-pointer">
          Jobs
        </span>
        <span className="hidden md:inline-block font-normal text-zinc-600 cursor-pointer">
          Dashboard
        </span>
      </nav>
      <button
        className="bg-blue-700 text-white font-bold px-3 py-2 rounded-md flex items-center gap-2 md:gap-4 hover:bg-blue-600 transition-all"
        onClick={() => router.push('/register')}
      >
        <FiLogOut />
        <span className="hidden md:inline-block">Register</span>
      </button>
    </header>
  );
}
