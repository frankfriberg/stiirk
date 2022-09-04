import { z } from 'zod'
import { createRouter } from './context'
import { createProtectedRouter } from './protected-router'
import { ExerciseType } from '@prisma/client'

const workoutRoundSchema = z.object({
  custom: z.string().optional(),
  type: z.nativeEnum(ExerciseType),
  amount: z.number(),
  split: z.boolean(),
  splitBreak: z.number(),
  splitTitle: z.array(z.string()).max(2),
  excludeRead: z.boolean(),
  exerciseId: z.string().optional(),
})

const workoutSetSchema = z.object({
  name: z.string(),
  exerciseRest: z.number(),
  tabata: z.boolean(),
  iterations: z.number(),
  rounds: z.array(workoutRoundSchema),
})

const workoutSchema = z.object({
  public: z.boolean(),
  name: z.string(),
  slug: z.string(),
  timerCountdown: z.boolean(),
  timerCountFrom: z.number(),
  timerReadExercise: z.boolean(),
  setRest: z.number(),
  sets: z.array(workoutSetSchema),
})

const createWorkoutObject = (input: z.infer<typeof workoutSchema>) => {
  const { sets, ...workout } = input

  return {
    ...workout,
    sets: {
      create: sets?.map((set) => ({
        name: set.name,
        exerciseRest: set.exerciseRest,
        tabata: set.tabata,
        iterations: set.iterations,
        rounds: {
          create: set?.rounds.map((round) => ({
            custom: round.custom,
            type: round.type,
            amount: round.amount,
            split: round.split,
            splitBreak: round.splitBreak,
            splitTitle: round.splitTitle,
            excludeRead: round.excludeRead,
            exercise: {
              connect: round.exerciseId,
            },
          })),
        },
      })),
    },
  }
}

export const protectedWorkoutRouter = createProtectedRouter()
  // Creates a new Workout
  .mutation('create', {
    input: workoutSchema,
    async resolve({ ctx, input }) {
      return await ctx.prisma.workout.create({
        data: {
          ...createWorkoutObject(input),
          user: {
            connect: {
              id: ctx.session.user.id,
            },
          },
        },
      })
    },
  })
  // Updates workout by ID
  .mutation('updateById', {
    input: z.object({
      id: z.string(),
      data: workoutSchema,
    }),
    async resolve({ ctx, input }) {
      return await ctx.prisma.workout.update({
        where: {
          workoutIdOwner: {
            id: input.id,
            userId: ctx.session.user.id,
          },
        },
        data: createWorkoutObject(input.data),
      })
    },
  })
  // Archives workout by ID
  .mutation('archiveById', {
    input: z.string(),
    async resolve({ ctx, input }) {
      return await ctx.prisma.workout.update({
        where: {
          workoutIdOwner: {
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

export const workoutRouter = createRouter()
  // Lists all viewable workouts
  .query('getAll', {
    async resolve({ ctx }) {
      return await ctx.prisma.workout.findMany({
        where: {
          public: true,
        },
      })
    },
  })
  // Returns a single workout by ID
  .query('getById', {
    input: z.string(),
    async resolve({ ctx, input }) {
      return await ctx.prisma.workout.findUnique({
        where: {
          id: input,
        },
      })
    },
  })
  // Returns workout run by ID, same function as getTodaysDaily
  .query('getRunById', {
    input: z.string(),
    async resolve({ ctx, input }) {
      const workout = await ctx.prisma.workout.findUnique({
        where: {
          id: input,
        },
      })
      return workout
    },
  })
