import { Goal } from 'lucide-react';
import Link from 'next/link';
import React, { useState } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';
import { links } from './links';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-white border-b border-slate-300 shadow md:px-11 p-4 flex flex-wrap justify-between items-center">
      <div className="flex items-center gap-5">
        <Goal size={32} className="text-blue-600" />
        <span className="font-bold text-transparent text-2xl bg-clip-text bg-gradient-to-r from-slate-600 to-slate-800">
          JobHunter
        </span>
      </div>
      <nav
        className={`${
          isMenuOpen ? 'flex' : 'hidden'
        } md:flex md:items-center md:gap-8`}
      >
        {links.map(link => (
          <Link
            key={link.id}
            href={link.href}
            className="font-medium text-zinc-900 cursor-pointer hover:text-blue-600 transition-all text-sm"
          >
            {link.label}
          </Link>
        ))}
      </nav>
      <div className="md:hidden">
        <button
          className="text-gray-600 hover:text-gray-900 focus:outline-none"
          onClick={toggleMenu}
          data-testid="toggle-menu"
        >
          {isMenuOpen ? (
            <FiX className="h-6 w-6" data-testid="close-button" />
          ) : (
            <FiMenu className="h-6 w-6" />
          )}
        </button>
      </div>
    </header>
  );
}
