// src/lib/functions/checkAuth.ts

import prisma from "$lib/prisma";

export const checkAuth = async (session: any) => {
  console.log('Session:', session);
  let user;

  if (session?.user?.email) {
    try {
      console.log('Fetching user with email:', session.user.email);
      user = await prisma.user.findUnique({
        where: {
          email: session.user.email,
        },
      });
      console.log('Fetched user:', user);

      if (!user) {
        console.log('Creating new user...');
        user = await prisma.user.create({
          data: {
            name: session.user.name,
            email: session.user.email,
            image: session.user.image,
            role: 'user',
          },
        });
        console.log('Created new user:', user);
      }
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  }

  return user;
};
