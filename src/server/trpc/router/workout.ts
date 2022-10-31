import { selectedInput } from 'lib/selectedInput'
import { workoutSchema, WorkoutSchema } from 'lib/validation/workout'
import { z } from 'zod'
import { publicProcedure, router, userProcedure } from '../trpc'

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

export const workoutRouter = router({
  // PUBLIC
  // Lists all public workouts
  getAll: publicProcedure
    .input(selectWorkoutInput)
    .query(async ({ input, ctx }) => {
      return await ctx.prisma.workout.findMany({
        where: {
          public: true,
        },
        select: selectedInput(input),
      })
    }),
  // Returns a single workout by ID
  getById: publicProcedure.input(z.string()).query(async ({ input, ctx }) => {
    return await ctx.prisma.workout.findFirst({
      where: {
        id: input,
        AND: [
          {
            public: true,
          },
        ],
      },
    })
  }),
  // Returns workout run by ID, same function as getTodaysDaily
  getRunById: publicProcedure
    .input(z.string())
    .query(async ({ input, ctx }) => {
      const workout = await ctx.prisma.workout.findFirst({
        where: {
          id: input,
          AND: [
            {
              public: true,
            },
          ],
        },
      })
      return workout
    }),

  // USER
  // Creates a new Workout
  create: userProcedure
    .input(workoutSchema)
    .mutation(async ({ input, ctx }) => {
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
    }),
  // Get list of own workouts
  getAllOwn: userProcedure
    .input(selectWorkoutInput)
    .query(async ({ input, ctx }) => {
      return await ctx.prisma.workout.findMany({
        where: {
          userId: ctx.session.user.id,
        },
        select: selectedInput(input),
      })
    }),
  // Updates workout by ID
  updateById: userProcedure
    .input(
      z.object({
        id: z.string(),
        data: workoutSchema,
      })
    )
    .mutation(async ({ input, ctx }) => {
      return await ctx.prisma.workout.update({
        where: {
          workoutIdOwner: {
            id: input.id,
            userId: ctx.session.user.id,
          },
        },
        data: createWorkoutObject(input.data),
      })
    }),
  // Archives workout by ID
  archiveById: userProcedure
    .input(z.string())
    .mutation(async ({ input, ctx }) => {
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
    }),
})
