import NextAuth, { type NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import EmailProvider from 'next-auth/providers/email'
import FacebookProvider from 'next-auth/providers/facebook'
import GoogleProvider from 'next-auth/providers/google'

// Prisma adapter for NextAuth, optional and can be removed
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { verify } from 'argon2'
import { env } from 'lib/env/server.mjs'
import { loginSchema } from 'lib/validation/user'
import { prisma } from '../../../utils/prisma'

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: '/user/login',
    newUser: '/user/register',
  },
  // Include user.id on session
  callbacks: {
    session({ session, user }) {
      if (session.user) session.user.id = user.id
      return session
    },
    // async signIn({ user }) {
    //   if (!user.username) return '/register'
    //   return true
    // },
  },
  // Configure one or more authentication providers
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const creds = await loginSchema.parseAsync(credentials)
        const user = await prisma.user.findUnique({
          where: {
            username: creds.username,
          },
          select: {
            id: true,
            isAdmin: true,
            isEditor: true,
            username: true,
            email: true,
            password: true,
          },
        })

        if (!user) return null
        if (!user.password) return null

        const isValidPassword = await verify(user.password, creds.password)

        if (!isValidPassword) return null

        return {
          id: user.id,
          email: user.email,
          isAdmin: user.isAdmin,
          isEditor: user.isEditor,
          username: user.username,
        }
      },
    }),
    EmailProvider({
      server: {
        host: env.EMAIL_SERVER_HOST,
        port: env.EMAIL_SERVER_PORT,
        auth: {
          user: env.EMAIL_SERVER_USER,
          pass: env.EMAIL_SERVER_PASSWORD,
        },
      },
      from: process.env.EMAIL_FROM,
    }),
    FacebookProvider({
      clientId: env.FACEBOOK_CLIENT_ID,
      clientSecret: env.FACEBOOK_CLIENT_SECRET,
    }),
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
  ],
}

export default NextAuth(authOptions)
