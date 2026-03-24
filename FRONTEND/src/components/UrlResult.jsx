import React, { useState, useRef } from 'react';
import { firecracker } from '../assets/index.js';

const UrlResult = ({ url }) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const audioRef = useRef(null);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url.shortUrl);

      // Trigger animation
      setIsAnimating(true);

      // Play firecracker sound
      try {
        if (!audioRef.current) audioRef.current = new Audio(firecracker);
        audioRef.current.currentTime = 0;
        audioRef.current.play().catch(e => console.error('Audio play failed:', e));
      } catch {
        // Audio blocked — silently ignore
      }

      // Reset animation state after 400ms (matches CSS duration)
      setTimeout(() => setIsAnimating(false), 400);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <div className="flex flex-col gap-4 mt-4">
      <div className="bg-white border-4 border-black p-4 sm:p-6 shadow-[6px_6px_0px_#000] flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-6">
        <div className="flex flex-col gap-2 w-full text-center sm:text-left">
          <span className="text-xl font-bold bg-cream px-2 py-1 inline-block border-2 border-black border-dashed self-center sm:self-start">
            SUCCESS! LINK GENERATED
          </span>
          <a href={url.shortUrl} target="_blank" rel="noopener noreferrer" className="text-2xl sm:text-3xl font-bold text-darkpurple hover:text-[#ff5722] hover:underline uppercase tracking-wider block mt-2 break-all">
            {url.shortUrl}
          </a>
        </div>

        <button
          onClick={handleCopy}
          className={`bg-lightpurple border-4 border-black text-black w-20 h-20 flex items-center justify-center shrink-0 shadow-[4px_4px_0px_#000] hover:translate-y-[2px] hover:translate-x-[2px] hover:shadow-[2px_2px_0px_#000] hover:bg-lightblue active:translate-y-[4px] active:translate-x-[4px] active:shadow-none transition-all ${isAnimating ? 'firecracker-active cursor-default' : 'cursor-pointer'}`}
          title="Copy Link"
          aria-label="Copy short url"
        >
          {isAnimating ? (
            <span className="text-4xl font-bold">!</span>
          ) : (
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="square" strokeLinejoin="miter">
              <rect x="9" y="9" width="13" height="13"></rect>
              <path d="M5 15H4V4h11v1"></path>
            </svg>
          )}
        </button>
      </div>
    </div>
  );
};

export default UrlResult;
