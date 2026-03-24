import axios from "axios";
import { store } from '../store/slice/store';
import { logout } from '../store/slice/authSlice';

const API_URL = (import.meta.env.VITE_API_URL || 'https://cut-url-crlg.onrender.com').replace(/\/$/, '');

const axiosInstance = axios.create({
    baseURL: API_URL,
    withCredentials: true,
});

// Handle global response errors
axiosInstance.interceptors.response.use(
    (response) => {
        // Optional: Do something with response data
        return response;
    },
    (error) => {
        // Global error handler
        console.error("API Error Response:", error.response?.data || error.message);
        
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            if (error.response.status === 401) {
                console.error("Unauthorized access - maybe redirect to login?");
                // Force logout when backend rejects old mocked tokens giving 401
                store.dispatch(logout());
            } else if (error.response.status === 404) {
                console.error("Resource not found API requested");
            } else if (error.response.status >= 500) {
                console.error("Server error occurred!");
            }
        } else if (error.request) {
            // The request was made but no response was received
            console.error("No response received from server");
        } else {
            // Something happened in setting up the request that triggered an Error
            console.error("Error setting up request", error.message);
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;