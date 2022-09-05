import { createRouter } from './context'
import { z } from 'zod'
import { createProtectedRouter } from './protected-router'
import { exerciseSchema } from './exercise'

export const dailyExerciseSchema = z.object({
  max: z.number(),
  min: z.number(),
  split: z.boolean(),
  exercise: exerciseSchema.extend({
    id: z.string(),
  }),
})

export const dailyWorkoutSchema = z.object({
  name: z.string(),
  exercises: z.array(dailyExerciseSchema).optional(),
})

export const dailySchema = z.object({
  slug: z.string(),
  startDate: z.date(),
  maxReps: z.number(),
  startReps: z.number(),
  maxSets: z.number(),
  repRatio: z.array(z.number()),
  workouts: z.array(dailyWorkoutSchema).optional(),
})

export type DailySchema = z.infer<typeof dailySchema>
export type DailyExerciseSchema = z.infer<typeof dailyExerciseSchema>
export type DailyWorkoutSchema = z.infer<typeof dailyWorkoutSchema>

const createDailyObject = (input: z.infer<typeof dailySchema>) => {
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

export const protectedDailyRouter = createProtectedRouter()
  // Create a new Daily plan
  .mutation('create', {
    input: dailySchema,
    async resolve({ input, ctx }) {
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
    },
  })
  // Updates Daily by ID
  .mutation('updateById', {
    input: z.object({ id: z.string(), data: dailySchema }),
    async resolve({ ctx, input }) {
      return await ctx.prisma.daily.update({
        where: {
          dailyIdOwner: {
            id: input.id,
            userId: ctx.session.user.id,
          },
        },
        data: createDailyObject(input.data),
      })
    },
  })
  // Archives Daily by ID
  .mutation('archiveById', {
    input: z.string(),
    async resolve({ ctx, input }) {
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
    },
  })

export const dailyRouter = createRouter()
  // Returns a Daily plan by slug
  .query('getBySlug', {
    input: z.string(),
    async resolve({ input, ctx }) {
      return await ctx.prisma.daily.findUnique({
        where: {
          slug: input,
        },
      })
    },
  })

  // Returns todays workout from Daily plan
  // TODO: #19 Add workout filter to todays plan
  .query('getTodaysBySlug', {
    input: z.string(),
    async resolve({ input, ctx }) {
      const daily = await ctx.prisma.daily.findUnique({
        where: {
          slug: input,
        },
      })
      return daily
    },
  })
