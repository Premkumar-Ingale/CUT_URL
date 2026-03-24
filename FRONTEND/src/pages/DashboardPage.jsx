import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import UserUrl from '../components/UserUrl';
import { fetchDashboardUrls } from '../api/urlApi';

const DashboardPage = () => {
  const { data: urls, isLoading, error, refetch, isFetching } = useQuery({
    queryKey: ['dashboardUrls'],
    queryFn: fetchDashboardUrls,
  });

  const [noErrorMsg, setNoErrorMsg] = useState('');

  useEffect(() => {
    if (error) {
      fetch('http://localhost:3000/api/create/no', {credentials: 'include'})
      .then(res => res.json())
      .then(data => setNoErrorMsg(data.reason))
      .catch(() => setNoErrorMsg('NO.'));
    }
  }, [error]);

  return (
    <div className="flex flex-col gap-6 ">
      <div className="bg-darkpurple text-white border-4 border-black p-4 sm:p-5 shadow-[6px_6px_0_#000] flex flex-col sm:flex-row justify-between items-center gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold uppercase tracking-widest">&gt; USER DASHBOARD</h2>
          <p className="text-lg sm:text-xl mt-1 sm:mt-2">MAPPED SHORT LINKS &amp; LOGS</p>
        </div>
        <button
          onClick={() => refetch()}
          disabled={isFetching}
          className="bg-[#ffeb3b] text-black border-4 border-black px-4 py-2 sm:py-3 text-xl font-bold uppercase shadow-[4px_4px_0_#000] hover:translate-y-[2px] hover:translate-x-[2px] hover:shadow-[2px_2px_0_#000] active:shadow-none transition-all disabled:opacity-75 disabled:cursor-not-allowed w-full sm:w-auto"
        >
          {isFetching ? 'SYNCING...' : 'REFRESH LOGS'}
        </button>
      </div>

      <div className="bg-lightblue border-4 border-black p-4 sm:p-6 shadow-[8px_8px_0_#000] flex flex-col gap-6 min-h-[300px] sm:min-h-[400px]">
        {isLoading ? (
          <div className="text-center font-bold text-2xl animate-pulse mt-10">LOADING LOGS...</div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center p-6 sm:p-8 bg-[#ef4444] text-white border-4 border-black shadow-[4px_4px_0_#000] mt-6 -rotate-1">
            <span className="text-3xl sm:text-4xl font-bold uppercase tracking-[0.2em] mb-4 text-center leading-relaxed break-words">
              {noErrorMsg || "LOADING REJECTION..."}
            </span>
            <span className="bg-black text-[#ffeb3b] px-4 py-2 text-lg sm:text-xl font-bold border-2 border-white break-words text-center">
              SIGH: {error.response?.data?.message || error.message}
            </span>
          </div>
        ) : urls && urls.length > 0 ? (
          urls.map(url => (
            <UserUrl
              key={url._id}
              originalUrl={url.full_url}
              shortUrl={`http://localhost:3000/${url.short_url}`}
              clicks={url.clicks}
              createdAt={url.createdAt}
            />
          ))
        ) : (
          <div className="flex flex-col items-center justify-center h-full mt-12 gap-4">
            <span className="text-center font-bold text-2xl sm:text-3xl uppercase bg-white border-4 border-black p-4 rotate-2 shadow-[4px_4px_0_#000]">
              NO LINKS FOUND.
            </span>
            <p className="text-lg sm:text-xl font-bold text-center">START COMPRESSING LINKS ON THE HOME PAGE!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
