import { useRouter } from 'next/router';
import React from 'react';
import { FiLogOut } from 'react-icons/fi';

export default function Header() {
  const router = useRouter();

  return (
    <header className="bg-white border-b border-zinc-300 shadow px-11 py-3 flex justify-between items-center">
      <span className="text-xl">jobHunter</span>
      <button
        className="bg-blue-700 text-white font-bold px-3 py-2 rounded-md flex items-center gap-4 hover:bg-blue-600 transition-all"
        onClick={() => router.push('/register')}
      >
        <FiLogOut />
        Register
      </button>
    </header>
  );
}
