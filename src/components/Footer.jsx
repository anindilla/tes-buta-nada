import React from 'react';

const Footer = () => {
  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-sm border-t border-gray-200 py-3 px-4 z-50">
      <div className="max-w-4xl mx-auto text-center">
        <p className="text-sm text-gray-600">
          Vibe-coded by{' '}
          <a 
            href="https://anindilla.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-purple-600 hover:text-purple-700 font-medium transition-colors duration-200 hover:underline"
          >
            dilleuh
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
