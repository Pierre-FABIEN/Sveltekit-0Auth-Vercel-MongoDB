// src/routes/api/auth/refresh/+server.ts
import type { RequestHandler } from '@sveltejs/kit';
import jwt from 'jsonwebtoken';
import { SECRET_STRING } from '$env/dynamic/private';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const GET: RequestHandler = async ({ cookies }) => {
  const refreshToken = cookies.get('refreshToken');
  console.log('Received refreshToken:', refreshToken);

  if (!refreshToken) {
    console.log('No refreshToken found');
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  try {
    const decoded = jwt.verify(refreshToken, SECRET_STRING);
    console.log('Decoded refreshToken:', decoded);

    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
    });

    if (!user) {
      console.log('User not found');
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const newToken = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      SECRET_STRING,
      { expiresIn: '15m' }
    );

    cookies.set('token', newToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 15 * 60, // 15 minutes
      path: '/'
    });

    return new Response(JSON.stringify({ user }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (err) {
    console.log('RefreshToken verification failed:', err);
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
