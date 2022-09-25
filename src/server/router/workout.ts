import { selectedInput } from 'lib/selectedInput'
import { workoutSchema, WorkoutSchema } from 'lib/validation/workout'
import { z } from 'zod'
import { createRouter } from './context'
import { createProtectedRouter } from './protected-router'

const selectWorkoutInput = z.array(workoutSchema.keyof()).optional()

const createWorkoutObject = (input: WorkoutSchema) => {
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

export const userWorkoutRouter = createProtectedRouter()
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
  // Get list of own workouts
  .query('getAllOwn', {
    input: selectWorkoutInput,
    async resolve({ ctx, input }) {
      return await ctx.prisma.workout.findMany({
        where: {
          userId: ctx.session.user.id,
        },
        select: selectedInput(input),
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
    input: selectWorkoutInput,
    async resolve({ input, ctx }) {
      return await ctx.prisma.workout.findMany({
        where: {
          public: true,
        },
        select: selectedInput(input),
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
