import type { LayoutServerLoad } from './$types'
import {
  locales,
  loadTranslations,
  translations,
  defaultLocale,
} from '$UITools/Translations'

export const load: LayoutServerLoad = async (event) => {
  const { url, cookies, request, locals } = event
  const { pathname } = url

  const session = await locals.getSession()
  console.log('Session:', session) // Vérifiez que la session est bien récupérée

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
