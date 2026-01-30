'use client';

import { useState } from 'react';
import Image from 'next/image';
import ChatWindow from './ChatWindow';

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Chat Window */}
      {isOpen && <ChatWindow onClose={() => setIsOpen(false)} />}

      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110 ${
          isOpen
            ? 'bg-gray-800'
            : 'bg-white border-2 border-[#E03B12]/20'
        }`}
        aria-label={isOpen ? 'Close chat' : 'Open FoxAI chat'}
      >
        {isOpen ? (
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <Image src="/logo.png" alt="FoxAI" width={36} height={36} className="w-9 h-9 object-contain" />
        )}
      </button>
    </>
  );
}
