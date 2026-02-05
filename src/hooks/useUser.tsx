import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import type { User } from '../types';

/**
 * Fetch user data from the API
 * @param {string} userId - The user ID
 * @returns {Promise} Axios response with user data
 */
const fetchUser = async (userId: string): Promise<User> => {
  const endpoint = `${import.meta.env.VITE_API}/users/${userId}`;
  const { data } = await axios.get<User>(endpoint);

  // Invalid requests results in an XML with code 200
  if (typeof data === 'string') {
    throw new Error('Not valid response');
  }

  return data;
};

/**
 * Custom hook to fetch user data using React Query
 * @param {string} userId - The user ID to fetch
 * @returns {Object} React Query result object with user data, loading and error states
 * @example const { data, isLoading, isError } = useUser(userId);
 */
export const useUser = (userId: string | undefined) => {
  return useQuery<User>({
    queryKey: ['user', userId],
    queryFn: () => fetchUser(userId!),
    enabled: !!userId, // Only fetch when userId is truthy
  });
};
