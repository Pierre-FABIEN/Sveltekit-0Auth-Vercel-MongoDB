import { checkAuth } from '$lib/functions/checkAuth';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
  const session = await locals.getSession();
  const user = await checkAuth(session) 

  if (user && session) {
    session.user.role = user.role;
  }
  return { session };
};