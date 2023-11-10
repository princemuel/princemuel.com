import { z } from 'zod';

// const BaseUrlSchema = z.preprocess(
//   // This prevents Vercel deployments from failing
//   // if you don't set the base url,
//   // it automatically uses the VERCEL_URL if present.
//   (value) => process.env.VERCEL_URL ?? value,
//   // VERCEL_URL doesn't include `https` so it cant be validated as a URL
//   process.env.VERCEL ? z.string().min(1) : z.string().url()
// );

/**
 * Specify your server-side environment variables schema here.
 * This way you can ensure the app isn't built with invalid env vars.
 */
const server = z.object({
  PORT: z.coerce.number().optional(),
  NODE_ENV: z
    .enum(['development', 'test', 'production'])
    .default('development'),

  // DATABASE_URL: z.string().url(),
});

/**
 * Specify your client-side environment variables schema here.
 * This way you can ensure the app isn't built with invalid env vars.
 * To expose them to the client, prefix them with `VITE_`.
 */
const client = z.object({
  REMIX_PUBLIC_VERCEL_URL: z.string().min(1).optional(),
  // VITE_CLIENTVAR: z.string().min(1),
});

/**
 * You can't destruct `process.env` or `import.meta.env` as a regular object
 * in the runtimes (e.g. middlewares) or client-side,
 * so we need to load the variables manually.
 *
 * @type {Record<keyof z.infer<typeof server> | keyof z.infer<typeof client>, string | undefined>}
 */
const processEnv = {
  PORT: process.env.PORT,
  NODE_ENV: process.env.NODE_ENV,

  // DATABASE_URL: process.env.DATABASE_URL,
  REMIX_PUBLIC_VERCEL_URL: process.env.REMIX_PUBLIC_VERCEL_URL,
};

// ------------------------------------
// ------------------------------------
// !WARNING: Don't touch the code below
// ------------------------------------
// ------------------------------------

const merged = server.merge(client);

/** @typedef {z.input<typeof merged>} MergedInput */
/** @typedef {z.infer<typeof merged>} MergedOutput */
/** @typedef {z.SafeParseReturnType<MergedInput, MergedOutput>} MergedSafeParseReturn */

let envVars = /** @type {MergedOutput} */ (Object.assign({}, process.env));

if (Boolean(process.env.SKIP_ENV_VALIDATION) == false) {
  const isServer = typeof document === 'undefined';

  const parsed = /** @type {MergedSafeParseReturn} */ (
    isServer
      ? merged.safeParse(processEnv) // on server we can validate all env vars
      : client.safeParse(processEnv) // on client we can only validate the ones that are exposed
  );

  if (!parsed.success) {
    console.error(
      '❌ Invalid environment variables:',
      parsed.error.flatten().fieldErrors
    );
    throw new Error('Invalid environment variables');
  }

  envVars = new Proxy(parsed.data, {
    get(target, prop) {
      if (typeof prop !== 'string') return undefined;
      // Throw a descriptive error if a server-side env var is accessed on the client
      // Otherwise it would just be returning `undefined` and be annoying to debug
      if (!isServer && !prop.startsWith('REMIX_PUBLIC_'))
        throw new Error(
          process.env.NODE_ENV === 'production'
            ? '❌ Attempted to access a server-side environment variable on the client'
            : `❌ Attempted to access server-side environment variable '${prop}' on the client`
        );
      return target[/** @type {keyof typeof target} */ (prop)];
    },
  });
}

export { envVars };
