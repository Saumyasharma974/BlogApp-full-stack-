import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineMenu } from "react-icons/ai";
import { IoCloseSharp } from "react-icons/io5";

function Navbar() {
  const [show, setShow] = useState(false);

  return (
    <nav className="shadow-lg py-3 px-4">
      <div className="flex items-center justify-between container mx-auto">
        {/* Brand Logo */}
        <div className="font-semibold text-xl">
          Awesome<span className="text-blue-500">Blog</span>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6 w-full">
          {/* Centered Navigation Links */}
          <ul className="flex space-x-4 justify-center w-full">
            <li><Link to="/" className="hover:text-blue-500">HOME</Link></li>
            <li><Link to="/blogs" className="hover:text-blue-500">BLOG</Link></li>
            <li><Link to="/creators" className="hover:text-blue-500">CREATORS</Link></li>
            <li><Link to="/about" className="hover:text-blue-500">ABOUT</Link></li>
            <li><Link to="/contact" className="hover:text-blue-500">CONTACT</Link></li>
          </ul>
          {/* Buttons Aligned to Right */}
          <div className="ml-auto space-x-2">
            <Link
              to="/dashboard"
              className="bg-blue-600 text-white font-semibold hover:bg-blue-800 duration-300 px-4 py-2 rounded"
            >
              DASHBOARD
            </Link>
            <Link
              to="/login"
              className="bg-red-600 text-white font-semibold hover:bg-red-800 duration-300 px-4 py-2 rounded"
            >
              LOGIN
            </Link>
          </div>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden" onClick={() => setShow(!show)}>
          {show ? <IoCloseSharp size={24} /> : <AiOutlineMenu size={24} />}
        </div>
      </div>

      {/* Mobile Navigation */}
      {show && (
        <div className="md:hidden bg-gray-100 py-4">
          <ul className="flex flex-col items-center space-y-4">
            <li><Link to="/" className="hover:text-blue-500">HOME</Link></li>
            <li><Link to="/blogs" className="hover:text-blue-500">BLOG</Link></li>
            <li><Link to="/creators" className="hover:text-blue-500">CREATORS</Link></li>
            <li><Link to="/about" className="hover:text-blue-500">ABOUT</Link></li>
            <li><Link to="/contact" className="hover:text-blue-500">CONTACT</Link></li>
          </ul>
          <div className="flex flex-col items-center space-y-2 mt-4">
            <Link
              to="/dashboard"
              className="bg-blue-600 text-white font-semibold hover:bg-blue-800 duration-300 px-4 py-2 rounded"
            >
              DASHBOARD
            </Link>
            <Link
              to="/login"
              className="bg-red-600 text-white font-semibold hover:bg-red-800 duration-300 px-4 py-2 rounded"
            >
              LOGIN
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
