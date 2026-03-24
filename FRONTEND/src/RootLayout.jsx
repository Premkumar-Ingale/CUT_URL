import React, { useEffect } from 'react';
import { createRootRoute, Outlet } from '@tanstack/react-router';
import Header from './components/Header';
import NavBar from './components/NavBar';
import { useSelector } from 'react-redux';
import useSessionRestore from './utils/useSessionRestore';

const RootComponent = () => {
  const isDark = useSelector((state) => state.theme.isDark);

  // Validate JWT cookie on every page load and restore auth state
  useSessionRestore();

  // Apply data-theme to <html> so all CSS [data-theme="dark"] selectors work
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  return (
    <div className="max-w-[700px] mx-auto px-3 sm:px-6 py-6 sm:py-10 flex flex-col gap-6 sm:gap-10 min-h-screen font-['VT323']">
      <NavBar />
      <Header />
      <Outlet />
    </div>
  );
};

export const rootRoute = createRootRoute({
  component: RootComponent,
});
