import { SvelteKitAuth } from '@auth/sveltekit'
import Google from '@auth/sveltekit/providers/google'

export const { handle, signIn, signOut } = SvelteKitAuth({
  trustHost: true,
  providers: [Google],
  secret: process.env.AUTH_SECRET,
})
