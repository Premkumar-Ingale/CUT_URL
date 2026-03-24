import { createSlice } from '@reduxjs/toolkit';

const savedTheme = localStorage.getItem('theme');

const themeSlice = createSlice({
  name: 'theme',
  initialState: {
    isDark: savedTheme === 'dark',
  },
  reducers: {
    toggleTheme: (state) => {
      state.isDark = !state.isDark;
      localStorage.setItem('theme', state.isDark ? 'dark' : 'light');
    },
    setDark: (state) => {
      state.isDark = true;
      localStorage.setItem('theme', 'dark');
    },
    setLight: (state) => {
      state.isDark = false;
      localStorage.setItem('theme', 'light');
    },
  },
});

export const { toggleTheme, setDark, setLight } = themeSlice.actions;
export default themeSlice.reducer;
