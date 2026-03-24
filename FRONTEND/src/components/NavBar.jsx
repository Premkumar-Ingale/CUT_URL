import React from 'react';
import { Link, useNavigate } from '@tanstack/react-router';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store/slice/authSlice';
import { toggleTheme } from '../store/slice/themeSlice';

const NavBar = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const isDark = useSelector((state) => state.theme.isDark);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const activeProps = { className: "bg-[#ffeb3b] translate-y-[2px] translate-x-[2px] shadow-[2px_2px_0_#000]" };
  const inactiveProps = { className: "" };

  const handleLogout = () => {
    dispatch(logout());
    navigate({ to: '/' });
  };

  const navLinkClass = `px-3 py-2 sm:px-4 border-4 border-black text-lg sm:text-xl font-bold uppercase tracking-wider 
    hover:bg-[#ffeb3b] hover:translate-y-[2px] hover:translate-x-[2px] hover:shadow-[2px_2px_0_#000] 
    transition-all shadow-[4px_4px_0_#000] ${isDark ? 'bg-[#0d1033] text-[#e8e8ff]' : 'bg-white text-black'}`;

  return (
    <nav className="flex justify-center flex-wrap gap-3 p-4">
      <Link to="/" activeProps={activeProps} inactiveProps={inactiveProps} className={navLinkClass}>
        Home
      </Link>

      {isAuthenticated && (
        <Link to="/dashboard" activeProps={activeProps} inactiveProps={inactiveProps} className={navLinkClass}>
          Dashboard
        </Link>
      )}

      <Link to="/about" activeProps={activeProps} inactiveProps={inactiveProps} className={navLinkClass}>
        About
      </Link>

      {isAuthenticated ? (
        <button
          onClick={handleLogout}
          className={`px-4 py-2 border-4 border-black text-xl font-bold uppercase tracking-wider 
            hover:bg-red-400 hover:translate-y-[2px] hover:translate-x-[2px] hover:shadow-[2px_2px_0_#000] 
            transition-all shadow-[4px_4px_0_#000] ${isDark ? 'bg-[#0d1033] text-[#e8e8ff]' : 'bg-white text-black'}`}
        >
          Logout
        </button>
      ) : (
        <Link to="/auth" activeProps={activeProps} inactiveProps={inactiveProps} className={navLinkClass}>
          Log in/Register
        </Link>
      )}

      {/* Theme toggle – pixel art sun/moon */}
      <button
        onClick={() => dispatch(toggleTheme())}
        title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        className={`px-4 py-2 border-4 border-black text-2xl shadow-[4px_4px_0_#000] 
          hover:translate-y-[2px] hover:translate-x-[2px] hover:shadow-[2px_2px_0_#000] 
          transition-all ${isDark ? 'bg-[#120c3a] text-yellow-300' : 'bg-[#ffeb3b] text-black'}`}
      >
        {isDark ? '☀' : '🌙'}
      </button>
    </nav>
  );
};

export default NavBar;
