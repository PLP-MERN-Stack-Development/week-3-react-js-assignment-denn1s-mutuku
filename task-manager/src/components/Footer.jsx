// src/components/Footer.jsx
// A custom Footer component built with Tailwind CSS.
import React from 'react';

function Footer() {
  return (
    <footer className="bg-gray-800 text-white p-6 mt-8 rounded-t-xl shadow-inner">
      <div className="container mx-auto text-center md:flex md:justify-between md:items-center">
        {/* Copyright Information */}
        <div className="mb-4 md:mb-0">
          <p className="text-sm">&copy; {new Date().getFullYear()} My App. All rights reserved.</p>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-wrap justify-center md:justify-end space-x-4 text-sm">
          <a href="/privacy" className="hover:text-blue-400 transition-colors duration-300">Privacy Policy</a>
          <a href="/terms" className="hover:text-blue-400 transition-colors duration-300">Terms of Service</a>
          <a href="/sitemap" className="hover:text-blue-400 transition-colors duration-300">Sitemap</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
