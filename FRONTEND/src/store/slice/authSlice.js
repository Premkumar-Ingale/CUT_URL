import { createSlice } from '@reduxjs/toolkit';

// Restore any persisted user info from localStorage
const storedUser = (() => {
  try { return JSON.parse(localStorage.getItem('auth_user')) || null; } catch { return null; }
})();

const initialState = {
  isAuthenticated: !!storedUser,
  user: storedUser,
  // 'idle' | 'loading' | 'resolved' — tracks whether the /me check ran
  sessionStatus: 'idle',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload || null;
      state.sessionStatus = 'resolved';
      localStorage.setItem('auth_user', JSON.stringify(action.payload || null));
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.sessionStatus = 'resolved';
      localStorage.removeItem('auth_user');
    },
    setSessionResolved: (state) => {
      state.sessionStatus = 'resolved';
    },
    setSessionLoading: (state) => {
      state.sessionStatus = 'loading';
    },
  },
});

export const { login, logout, setSessionResolved, setSessionLoading } = authSlice.actions;
export default authSlice.reducer;
