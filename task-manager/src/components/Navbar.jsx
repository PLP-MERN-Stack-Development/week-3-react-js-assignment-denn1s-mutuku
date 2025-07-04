// src/components/Navbar.jsx
// A custom Navbar component built with Tailwind CSS and simple icons.
import React, { useState } from 'react';
import { Menu, X, Home, Info, Settings } from 'lucide-react'; // Assuming lucide-react is available

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-purple-700 p-4 shadow-lg rounded-b-xl">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo/Brand */}
        <a href="/" className="text-white text-3xl font-extrabold tracking-wider hover:text-blue-200 transition-colors duration-300">
          My App
        </a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-6">
          <NavLink href="/" icon={<Home size={20} />} text="Home" />
          <NavLink href="/features" icon={<Info size={20} />} text="Features" />
          <NavLink href="/settings" icon={<Settings size={20} />} text="Settings" />
          <NavLink href="/contact" text="Contact" />
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-white focus:outline-none p-2 rounded-md hover:bg-blue-700 transition-colors duration-300">
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation (conditionally rendered) */}
      {isOpen && (
        <div className="md:hidden bg-blue-800 mt-4 py-3 rounded-lg shadow-inner">
          <MobileNavLink href="/" icon={<Home size={20} />} text="Home" onClick={toggleMenu} />
          <MobileNavLink href="/features" icon={<Info size={20} />} text="Features" onClick={toggleMenu} />
          <MobileNavLink href="/settings" icon={<Settings size={20} />} text="Settings" onClick={toggleMenu} />
          <MobileNavLink href="/contact" text="Contact" onClick={toggleMenu} />
        </div>
      )}
    </nav>
  );
}

// Helper component for desktop navigation links
const NavLink = ({ href, icon, text }) => (
  <a
    href={href}
    className="text-white text-lg font-medium hover:text-blue-200 transition-colors duration-300 flex items-center space-x-2"
  >
    {icon && <span className="mr-1">{icon}</span>}
    <span>{text}</span>
  </a>
);

// Helper component for mobile navigation links
const MobileNavLink = ({ href, icon, text, onClick }) => (
  <a
    href={href}
    onClick={onClick}
    className="block text-white text-lg px-4 py-2 hover:bg-blue-700 transition-colors duration-300 flex items-center space-x-3"
  >
    {icon && <span className="mr-2">{icon}</span>}
    <span>{text}</span>
  </a>
);

export default Navbar;
