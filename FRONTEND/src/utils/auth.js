export const isAuthenticated = () => {
  return localStorage.getItem('auth_token') === 'true';
};

export const loginUser = () => {
  localStorage.setItem('auth_token', 'true');
};

export const logoutUser = () => {
  localStorage.removeItem('auth_token');
};
