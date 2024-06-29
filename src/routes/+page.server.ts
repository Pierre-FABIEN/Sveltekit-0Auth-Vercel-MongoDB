import type { LayoutServerLoad } from './$types'
import { checkAuth } from '$lib/functions/checkAuth'

export const load: LayoutServerLoad = async (event) => {
  const { url, locals } = event
  const { pathname } = url

  const session = await locals.getSession() 

  const user = await checkAuth(session) 

  if (user && session) {
    session.user.role = user.role;
  }
 // Load translations for the current locale and path

  return {
    user,
  }
}
