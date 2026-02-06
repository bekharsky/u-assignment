import { useQuery } from '@tanstack/react-query';
import type { User } from '../types';
import { UserSchema } from '../types';
import { apiClient, parseResponse } from '../lib/apiClient';

/**
 * Fetch user data from the API
 * @param {string} userId - The user ID
 * @returns {Promise} Axios response with user data
 */
const fetchUser = async (userId: string): Promise<User> => {
  const response = await apiClient.get(`/users/${userId}`);
  return parseResponse(response, UserSchema);
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
