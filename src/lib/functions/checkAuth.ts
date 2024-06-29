import prisma from "$lib/prisma";

export const checkAuth = async (session: any) => {
  let user

  if (session?.user?.email) {

    user = await prisma.user.findUnique({
      where: {
        email: session.user.email,
      }     
    })

    if (!user) {
      await prisma.user.create({
        data: {
          name: session.user.name,
          email: session.user.email,
          image: session.user.image,
          role: 'user',
        },
      })
    }
  }

  return user
}