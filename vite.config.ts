import { unstable_vitePlugin as remix } from '@remix-run/dev';
import { defineConfig, loadEnv, type ConfigEnv } from 'vite';
import svgr from 'vite-plugin-svgr';
import tsconfigPaths from 'vite-tsconfig-paths';

export default async ({ mode }: ConfigEnv) => {
  // Here we add env vars from .env files to process.env.
  // Note the last arg is a blank string so that all env vars
  // are loaded, not just those starting with "VITE_"

  Object.assign(process.env, loadEnv(mode, process.cwd(), ''));

  !!process.env.SKIP_ENV_VALIDATION && import('./app/env.dto.mjs');

  return defineConfig({
    plugins: [
      remix({
        ignoredRouteFiles: ['**/.*'],
      }),
      tsconfigPaths(),
      svgr({
        svgrOptions: { exportType: 'default' },
      }),
    ],
    server: {
      port: 3000,
      open: true,
    },
  });
};
