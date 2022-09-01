import { createRouter } from './context'
import { z } from 'zod'

export const dailyExerciseSchema = z.object({
  max: z.number(),
  min: z.number(),
  split: z.boolean(),
  exerciseId: z.string(),
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

export const dailyRouter = createRouter()
  .mutation('createDaily', {
    input: dailySchema,
    async resolve({ input, ctx }) {
      // Create workouts with exercises
      const { workouts, ...baseInput } = input

      const inputData = {
        ...baseInput,
        workouts: {
          create: workouts?.map((workout) => ({
            name: workout?.name,
            numberOfExercises: workout.exercises
              ? workout?.exercises.length
              : 0,
            exercises: {
              create: workout?.exercises,
            },
          })),
        },
      }

      // Create daily with connect to workouts
      return await ctx.prisma.daily.create({
        // data: inputData,
        data: inputData,
      })
    },
  })
  .query('getDailyBySlug', {
    input: z.string(),
    async resolve({ input, ctx }) {
      return await ctx.prisma.daily.findUnique({
        where: {
          slug: input,
        },
      })
    },
  })
