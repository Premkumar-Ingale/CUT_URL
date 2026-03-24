import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { login, logout, setSessionLoading, setSessionResolved } from '../store/slice/authSlice';
import axiosInstance from './axiosinstance';

/**
 * useSessionRestore
 *
 * On every page load/refresh, calls GET /api/auth/me to validate the
 * httpOnly JWT cookie. If valid, restores the user into Redux state.
 * If the cookie is expired or missing, dispatches logout so the UI
 * correctly reflects the unauthenticated state.
 */
const useSessionRestore = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSessionLoading());

    axiosInstance.get('/api/auth/me')
      .then(res => {
        dispatch(login(res.data));        // restores user + isAuthenticated
      })
      .catch(() => {
        dispatch(logout());               // cookie expired or missing → clean slate
      });
  }, []); // run once on mount
};

export default useSessionRestore;
