import { z } from 'zod';

/**
 * Environment variables schema
 */
const envSchema = z.object({
  VITE_API: z
    .string()
    .url('VITE_API must be a valid URL')
    .optional()
    .default('https://ui-developer-backend.herokuapp.com/api'),
});

/**
 * Validate and parse environment variables
 * Throws an error on startup if validation fails
 */
function validateEnv() {
  const result = envSchema.safeParse({
    VITE_API: import.meta.env.VITE_API,
  });

  if (!result.success) {
    console.error('❌ Environment validation failed:');
    console.error(result.error.flatten().fieldErrors);
    throw new Error('Invalid environment configuration');
  }

  return result.data;
}

/**
 * Validated environment variables
 * Safe to use throughout the application
 */
export const env = validateEnv();
