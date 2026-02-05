import axios, { type AxiosResponse } from 'axios';
import { type z } from 'zod';
import { env } from './env';

/**
 * Configured axios instance with base URL
 */
export const apiClient = axios.create({
  baseURL: env.VITE_API,
});

/**
 * Helper to parse API response with Zod schema
 * @param response - Axios response
 * @param schema - Zod schema to validate against
 * @returns Parsed and validated data
 * @throws {Error} If validation fails or response is invalid XML string
 */
export function parseResponse<T>(
  response: AxiosResponse,
  schema: z.ZodSchema<T>
): T {
  const { data } = response;

  // Invalid requests result in an XML string with code 200
  if (typeof data === 'string') {
    throw new Error('Invalid response: expected JSON but received string');
  }

  // Parse and validate with Zod
  const result = schema.safeParse(data);

  if (!result.success) {
    console.error('Zod validation error:', result.error);
    throw new Error(`Invalid response shape: ${result.error.message}`);
  }

  return result.data;
}
