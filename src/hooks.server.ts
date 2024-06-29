// src/hooks.server.ts
import { handle as authHandle } from './auth';
import { sequence } from '@sveltejs/kit/hooks';

export const handle = sequence(authHandle, async ({ event, resolve }) => {
  return resolve(event);
});
