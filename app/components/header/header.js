'use client';
import React from 'react';
import Link from 'next/link';

const Header = () => {
     function Logout() {
        localStorage.removeItem('user');
     }
    return (
        <header className="sticky top-0 bg-white border-b border-gray-200 shadow-sm z-50">
              <div className="max-w-7xl mx-auto px-6">
              <nav className="flex items-center justify-between h-18" aria-label="Primary navigation">
                    <Link href="/home" className="font-extrabold text-2xl tracking-tight text-black select-none" aria-label="Time Capsule Home">TimeCapsule</Link>
                    <div className="flex space-x-8 text-base font-semibold">
                    <Link href="/home" aria-current="page" className="relative pb-1 text-black hover:text-gray-800 focus:text-gray-800 focus:outline-none transition-colors duration-300">
                         Home
                         <span className="absolute left-0 bottom-0 w-full h-0.5 bg-black rounded-full"></span>
                    </Link>
                    <Link href="/home/capsules" className="text-gray-500 hover:text-black focus:text-black focus:outline-none transition-colors duration-300">Capsules</Link>
                    <Link href='/login' onClick={Logout} className="text-gray-500 hover:text-black cursor-pointer focus:text-black focus:outline-none transition-colors duration-300">Logout</Link>
                    </div>
              </nav>
              </div>
         </header>
    );
};

export default Header;