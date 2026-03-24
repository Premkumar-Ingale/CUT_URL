/**
 * API Layer
 * 
 * This file contains functions handling API requests.
 */

import axiosInstance from "../utils/axiosinstance";

/**
 * Calls the backend API to shorten a URL.
 * @param {string} originalUrl - The long URL to shorten.
 * @returns {Promise<Object>} The shortened URL data containing originalUrl and shortUrl.
 */
export const shortenUrl = async ({ originalUrl, customAlias }) => {
  if (!originalUrl || !originalUrl.startsWith('http')) {
    throw new Error('Please enter a valid URL with http/https');
  }

  try {
    const payload = { url: originalUrl };
    if (customAlias) payload.slug = customAlias;

    const response = await axiosInstance.post(`/api/create`, payload);

    // The backend returns the short URL as a plain string in response.data
    return {
      originalUrl,
      shortUrl: response.data.shortUrl
    };
  } catch (error) {
    // The global interceptor logged the specific error details.
    // Here we throw a clean error string for the React UI to display.
    throw new Error(error.response?.data?.message || 'Failed to shorten URL. Please try again.');
  }
};

// /**
//  * Simulates fetching previously shortened URLs from the backend.
//  * @returns {Promise<Array>} Array of URL objects.
//  */
export const fetchDashboardUrls = async () => {
   const response = await axiosInstance.get('/api/create/my-urls');
   return response.data;
};
