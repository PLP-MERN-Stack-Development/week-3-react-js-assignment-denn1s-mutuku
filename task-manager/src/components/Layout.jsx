// src/components/Layout.jsx
// This component provides a consistent layout including Navbar and Footer.
import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

function Layout({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        {children} {/* This prop renders the content passed into the Layout component */}
      </main>
      <Footer />
    </div>
  );
}

export default Layout;
