// src/hooks.server.ts

import prisma from '$lib/prisma';
import { handle as authHandle } from './auth';
import { sequence } from '@sveltejs/kit/hooks';

console.log('Prisma:', prisma);  // Vérifiez que Prisma est importé correctement

export const handle = sequence(authHandle, async ({ event, resolve }) => {
  const session = await event.locals.getSession();

  console.log('Session:', session);  // Ajoutez un log pour vérifier la session

  if (session?.user?.email) {
    try {
      console.log('Fetching user with email:', session.user.email);
      const user = await prisma.user.findUnique({
        where: {
          email: session.user.email,
        },
      });

      console.log('Fetched user:', user);

      if (user) {
        event.locals.role = user.role;
      }
    } catch (error) {
      console.error('Error fetching user role:', error);
    }
  }

  return resolve(event);
});
