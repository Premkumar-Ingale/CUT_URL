import React from 'react';

const UserUrl = ({ originalUrl, shortUrl, clicks, createdAt }) => {
  const clickCount = clicks || 0;
  const clickStyle = clickCount > 10 ? "pixel-fire-text" : "text-black drop-shadow-[2px_2px_0_#fff]";

  return (
    <div className="bg-white border-4 border-black p-4 flex flex-col gap-2 shadow-[4px_4px_0_#000] hover:translate-y-[2px] hover:translate-x-[2px] hover:shadow-[2px_2px_0_#000] transition-all">
      <div className="flex flex-col xs:flex-row justify-between items-start xs:items-center gap-2 bg-[#ffeb3b] border-4 border-black border-dashed px-3 py-2">
        <span className="font-bold text-lg uppercase flex items-center gap-2">
          🎯 TOTAL CLICKS: <span className={`text-2xl ${clickStyle}`}>{clickCount}</span>
        </span>
        <span className="font-bold text-sm uppercase bg-black text-white px-2 py-1 whitespace-nowrap">
          {createdAt ? new Date(createdAt).toLocaleDateString() : 'N/A'}
        </span>
      </div>
      <div className="flex flex-col gap-2 mt-2">
        <span className="text-md font-bold uppercase truncate max-w-full" title={originalUrl}>
          FROM: <a href={originalUrl} target="_blank" rel="noreferrer" className="text-gray-600 hover:text-black hover:underline">{originalUrl}</a>
        </span>
        <span className="text-2xl font-bold uppercase max-w-full break-all">
          TO: <a href={shortUrl} target="_blank" rel="noreferrer" className="text-darkpurple hover:text-[#ff5722] hover:underline drop-shadow-[1px_1px_0_#000]">{shortUrl}</a>
        </span>
      </div>
    </div>
  );
};

export default UserUrl;
