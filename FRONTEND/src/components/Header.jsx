import React from 'react';

const Header = () => {
  return (
    <header className="flex flex-col items-center gap-3 sm:gap-4 mt-4 sm:mt-8 border-b-4 border-black pb-5 sm:pb-8">
      <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-widest text-[#ffeb3b] drop-shadow-[4px_4px_0px_#000] uppercase pt-2 text-center">
        URL<span className="text-darkpurple">Cutter</span>
      </h1>
      <p className="text-xl sm:text-2xl text-black max-w-[90vw] sm:max-w-[500px] text-center bg-white p-2 sm:p-3 border-4 border-black shadow-[4px_4px_0_#000]">
        SHRINK YOUR LINKS! LVL UP YOUR SHARING.
      </p>
    </header>
  );
};

export default Header;
