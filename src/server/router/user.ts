import { hash } from 'argon2'
import { registerSchema } from 'lib/validation/user'
import { z } from 'zod'
import { createRouter } from './context'

export const userRouter = createRouter()
  .query('check_username', {
    input: z.string(),
    async resolve({ input, ctx }) {
      const user = await ctx.prisma.user.findUnique({
        where: {
          username: input,
        },
      })

      if (user) return false
      return true
    },
  })
  .mutation('register', {
    input: z.object({
      id: z.string(),
      data: registerSchema,
    }),
    resolve: async ({ input, ctx }) => {
      const { username, password, name } = input.data

      const hashedPassword = await hash(password)

      const result = await ctx.prisma.user.update({
        where: {
          id: input.id,
        },
        data: { username, name, password: hashedPassword },
      })

      return {
        status: 201,
        message: 'Account created successfully.',
        result: result.email,
      }
    },
  })
