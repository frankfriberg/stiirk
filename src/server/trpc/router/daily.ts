import { dailySchema, DailySchema } from 'lib/validation/daily'
import { z } from 'zod'
import { publicProcedure, router, userProcedure } from '../trpc'

const createDailyObject = (input: DailySchema) => {
  const { workouts, ...daily } = input

  return {
    ...daily,
    workouts: {
      create: workouts?.map((workout) => ({
        name: workout?.name,
        numberOfExercises: workout.exercises ? workout?.exercises.length : 0,
        exercises: {
          create: workout?.exercises?.map((exercise) => ({
            max: exercise.max,
            min: exercise.min,
            split: exercise.split,
            exercise: {
              connect: {
                id: exercise.exercise.id,
              },
            },
          })),
        },
      })),
    },
  }
}

export const dailyRouter = router({
  // PUBLIC
  // Returns a Daily by ID
  getById: userProcedure.input(z.string()).query(async ({ input, ctx }) => {
    return await ctx.prisma.daily.findUnique({
      where: {
        dailyIdOwner: {
          id: input,
          userId: ctx.session.user.id,
        },
      },
    })
  }),
  // Returns todays daily workout by ID
  getTodaysById: publicProcedure
    .input(z.string())
    .query(async ({ input, ctx }) => {
      const daily = await ctx.prisma.daily.findUnique({
        where: {
          id: input,
        },
      })
      return daily
    }),

  // USER
  // Creates Daily for user
  create: userProcedure.input(dailySchema).mutation(async ({ input, ctx }) => {
    return await ctx.prisma.daily.create({
      data: {
        ...createDailyObject(input),
        user: {
          connect: {
            id: ctx.session.user.id,
          },
        },
      },
    })
  }),

  // Update Daily by ID
  updateById: userProcedure
    .input(dailySchema)
    .mutation(async ({ input, ctx }) => {
      return await ctx.prisma.daily.update({
        where: {
          dailyIdOwner: {
            id: input.id,
            userId: ctx.session.user.id,
          },
        },
        data: createDailyObject(input),
      })
    }),

  // Archives Daily by ID
  archiveById: userProcedure
    .input(z.string())
    .mutation(async ({ input, ctx }) => {
      return await ctx.prisma.daily.update({
        where: {
          dailyIdOwner: {
            id: input,
            userId: ctx.session.user.id,
          },
        },
        data: {
          archived: true,
        },
      })
    }),
})
