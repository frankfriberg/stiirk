import { hash } from 'argon2'
import { registerSchema } from 'lib/validation/user'
import { z } from 'zod'
import { publicProcedure, router, userProcedure } from '../trpc'

export const userRouter = router({
  checkUsername: publicProcedure
    .input(z.string())
    .query(async ({ input, ctx }) => {
      const user = await ctx.prisma.user.findUnique({
        where: {
          username: input,
        },
      })

      if (user) return false
      return true
    }),
  register: userProcedure
    .input(registerSchema)
    .mutation(async ({ ctx, input }) => {
      const { username, password, name } = input

      const hashedPassword = await hash(password)

      const result = await ctx.prisma.user.update({
        where: {
          id: ctx.session.user.id,
        },
        data: { username, name, password: hashedPassword },
      })

      return {
        status: 201,
        message: 'Account created successfully.',
        result: result.email,
      }
    }),
})
