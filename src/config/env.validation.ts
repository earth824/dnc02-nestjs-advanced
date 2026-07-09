import z from 'zod';

const envSchema = z.object({
  ACCESS_JWT_SECRET: z.string().min(32),
  ACCESS_JWT_EXPIRES_IN: z.coerce.number().int().positive()
});

export function validate(config: Record<string, any>) {
  const parsed = envSchema.safeParse(config);
  if (!parsed.success) {
    throw new Error('Env validation failed');
  }
  return parsed.data;
}

export type EnvVariable = z.infer<typeof envSchema>;
