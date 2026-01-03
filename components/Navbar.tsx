
import React, { useState, useEffect } from 'react';
import { SearchIcon, BellIcon } from './Icons';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-50 transition-colors duration-500 px-4 md:px-12 py-4 flex items-center justify-between ${isScrolled ? 'bg-[#141414]' : 'bg-gradient-to-b from-black/80 to-transparent'}`}>
      <div className="flex items-center space-x-4 md:space-x-8">
        <h1 className="text-red-600 text-2xl md:text-3xl font-bold tracking-tighter uppercase cursor-pointer">Netflix</h1>
        
        <ul className="hidden lg:flex items-center space-x-6 text-sm text-gray-200">
          <li className="cursor-pointer hover:text-gray-400 font-semibold text-white">Home</li>
          <li className="cursor-pointer hover:text-gray-400">TV Shows</li>
          <li className="cursor-pointer hover:text-gray-400">Movies</li>
          <li className="cursor-pointer hover:text-gray-400">New & Popular</li>
          <li className="cursor-pointer hover:text-gray-400">My List</li>
          <li className="cursor-pointer hover:text-gray-400">Browse by Languages</li>
        </ul>
      </div>

      <div className="flex items-center space-x-4 text-white">
        <SearchIcon className="w-5 h-5 cursor-pointer hover:text-gray-300" />
        <span className="hidden md:block text-sm cursor-pointer hover:text-gray-300">Kids</span>
        <BellIcon className="w-5 h-5 cursor-pointer hover:text-gray-300" />
        <div className="w-8 h-8 rounded overflow-hidden cursor-pointer">
          <img src="https://picsum.photos/seed/user123/100" alt="Avatar" className="w-full h-full object-cover" />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
