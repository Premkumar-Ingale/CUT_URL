import axiosInstance from "../utils/axiosinstance";

export const registerUserService = async ({ name, email, password }) => {
  const response = await axiosInstance.post('/api/auth/register', { name, email, password });
  return response.data;
};

export const loginUserService = async ({ email, password }) => {
  const response = await axiosInstance.post('/api/auth/login', { email, password });
  return response.data;
};
