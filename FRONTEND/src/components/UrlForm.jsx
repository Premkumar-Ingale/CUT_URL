import React, { useState } from 'react';
import { useSelector } from 'react-redux';

const UrlForm = ({ onSubmit, isLoading }) => {
  const [url, setUrl] = useState('');
  const [customName, setCustomName] = useState('');
  const [error, setError] = useState(null);
  
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    if (!url.trim()) {
      setError('ERROR: ENTER URL');
      return;
    }
    try {
      await onSubmit({ url, customName: customName.trim() });
      setUrl('');
      setCustomName('');
    } catch (err) {
      setError(err.message || 'SYSTEM ERROR');
    }
  };

  return (
    <div className="bg-lightblue border-4 border-black p-4 sm:p-8 shadow-[8px_8px_0px_#000]">
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <label className="text-2xl font-bold uppercase block text-center sm:text-left">
          &gt; INSERT URL TO COMPRESS:
        </label>
        
        <div className="flex flex-col gap-3">
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-5 relative">
            <input
              type="text"
              name="urlinput"
              className="flex-1 bg-white border-4 border-black text-black px-4 py-3 sm:py-4 text-xl sm:text-2xl focus:outline-none focus:bg-[#ffeb3b] placeholder-slate-400 shadow-inner"
              placeholder="HTTP://..."
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              disabled={isLoading}
              autoComplete="off"
            />
            <button 
              type="submit" 
              className="bg-darkpurple text-white border-4 border-black px-6 py-3 sm:py-4 text-2xl font-bold uppercase tracking-wider shadow-[4px_4px_0px_#000] hover:translate-y-[2px] hover:translate-x-[2px] hover:shadow-[2px_2px_0px_#000] hover:bg-[#8679b3] active:translate-y-[4px] active:translate-x-[4px] active:shadow-none w-full sm:w-auto sm:min-w-[160px] disabled:bg-gray-400 disabled:text-gray-700 disabled:cursor-not-allowed disabled:shadow-none transition-transform"
              disabled={isLoading || !url.trim()}
            >
              {isLoading ? <span className="spinner"></span> : 'START'}
            </button>
          </div>
          
          {isAuthenticated && (
            <div className="flex flex-col gap-2 mt-2">
              <label className="text-xl font-bold uppercase block text-center sm:text-left text-black">
                &gt; CUSTOM ALIAS (OPTIONAL):
              </label>
              <input
                type="text"
                name="customName"
                className="flex-1 bg-white border-4 border-black text-black px-4 py-3 text-xl focus:outline-none focus:bg-[#ffeb3b] placeholder-slate-400 shadow-inner"
                placeholder="MY-UNIQUE-LINK"
                value={customName}
                onChange={(e) => setCustomName(e.target.value)}
                disabled={isLoading}
                autoComplete="off"
              />
            </div>
          )}

          {error && (
            <div className="text-white bg-red-600 border-4 border-black p-2 text-xl font-bold uppercase text-center mt-2 animate-pulse">
              [!] {error}
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default UrlForm;
