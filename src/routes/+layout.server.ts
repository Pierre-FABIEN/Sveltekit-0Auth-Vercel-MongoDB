import type { LayoutServerLoad } from './$types'
import {
  locales,
  loadTranslations,
  translations,
  defaultLocale,
} from '$UITools/Translations'
import prisma from '$lib/prisma'

export const load: LayoutServerLoad = async (event) => {
  const { url, cookies, request, locals } = event
  const { pathname } = url

  const session = await locals.getSession()
  console.log('Session:', session) // Vérifiez que la session est bien récupérée




  if (session?.user?.email) {
    // Vérifiez si l'utilisateur existe déjà dans la base de données
    
    console.log('la session existe');
    const user = await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
    })

    if (!user) {
      // Si l'utilisateur n'existe pas, l'enregistrer dans la base de données
      await prisma.user.create({
        data: {
          name: session.user.name,
          email: session.user.email,
          image: session.user.image,
          role: 'user', // ou tout autre rôle par défaut que vous souhaitez attribuer
        },
      })
    }
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
    session,
    i18n: { locale, route: pathname },
    translations: translations.get(), // Return loaded translations
  }
}
