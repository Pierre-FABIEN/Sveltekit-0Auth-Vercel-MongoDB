import type { LayoutServerLoad } from './$types'
import jwt from 'jsonwebtoken';
import {
  locales,
  loadTranslations,
  translations,
  defaultLocale,
} from '$UITools/Translations'
import { checkAuth } from '$lib/functions/checkAuth'


export const load: LayoutServerLoad = async (event) => {
  const { url, cookies, request, locals } = event
  const { pathname } = url
  
  const session = await locals.getSession() 

  const user = await checkAuth(session) 
  console.log(user);
  
  if (user && session) {
    const token = jwt.sign(
        { id: user.id, email: user.email, role: user.role },
        import.meta.env.SECRET_STRING,
        { expiresIn: '1h' }
    );

    event.cookies.set('token', token, {
        httpOnly: false,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60, // 1 hour
        path: '/'
    });

    session.user.role = user.role;
  }



  // Try to get the locale from cookie
  let locale = (cookies.get('lang') || '').toLowerCase()

  // Get user preferred locale
  if (!locale) {
    const acceptLanguageHeader = request.headers.get('accept-language') || ''
    locale = (acceptLanguageHeader.match(/[a-zA-Z]+?(?=-|_|,|;)/) || [
      defaultLocale,
    ])[0].toLowerCase()
  }

  // Get defined locales
  const supportedLocales = locales.get().map((l) => l.toLowerCase())

  // Use default locale if current locale is not supported
  if (!supportedLocales.includes(locale)) {
    locale = defaultLocale
  }

  await loadTranslations(locale, pathname) // Load translations for the current locale and path

  return {
    user,
    session,
    i18n: { locale, route: pathname },
    translations: translations.get(), // Return loaded translations
  }
}
