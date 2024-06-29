// src/hooks.server.ts
import prisma from '$lib/prisma';
import { handle as authHandle } from './auth';
import { sequence } from '@sveltejs/kit/hooks';

export const handle = sequence(authHandle, async ({ event, resolve }) => {
  const session = await event.locals.getSession()
  //console.log(session, 'oiuhesiuh');
  
  if (session?.user?.email) {
    const user = await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
    });
  }

  return resolve(event);
});
