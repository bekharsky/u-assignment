import axios from 'axios';

const API_BASE =
  import.meta.env.VITE_API || 'https://ui-developer-backend.herokuapp.com/api';

/**
 * Configured axios instance with base URL
 */
export const apiClient = axios.create({
  baseURL: API_BASE,
});
