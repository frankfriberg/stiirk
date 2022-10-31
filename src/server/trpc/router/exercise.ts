import { selectedInput } from 'lib/selectedInput'
import { exerciseSchema } from 'lib/validation/exercise'
import { z } from 'zod'
import {
  editorProcedure,
  publicProcedure,
  router,
  userProcedure,
} from '../trpc'

const selectExerciseInput = z.array(exerciseSchema.keyof()).optional()

export const exerciseRouter = router({
  // USER
  // Get all exercises in database
  getAll: publicProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.exercise.findMany()
  }),
  // Get single exercise from database by ID
  getById: publicProcedure.input(z.string()).query(async ({ input, ctx }) => {
    return await ctx.prisma.exercise.findUnique({
      where: {
        id: input,
      },
    })
  }),
  // EDITOR
  // Add new exercise to database
  create: editorProcedure
    .input(exerciseSchema)
    .mutation(async ({ input, ctx }) => {
      return await ctx.prisma.exercise.create({
        data: input,
      })
    }),
  // Update existing exercise in database by ID
  updaterById: editorProcedure
    .input(
      z.object({
        id: z.string(),
        data: exerciseSchema,
      })
    )
    .mutation(async ({ input, ctx }) => {
      return await ctx.prisma.exercise.update({
        where: {
          id: input.id,
        },
        data: input.data,
      })
    }),
})

export const requestRouter = router({
  // USER
  // Creates new request for a new exercise to be added
  create: userProcedure
    .input(exerciseSchema)
    .mutation(async ({ input, ctx }) => {
      return await ctx.prisma.exerciseRequest.create({
        data: {
          ...input,
          type: 'create',
          user: {
            connect: {
              id: ctx.session.user.id,
            },
          },
        },
      })
    }),
  // Creates new request to update an existing exercise
  update: userProcedure
    .input(z.object({ id: z.string(), data: exerciseSchema }))
    .mutation(async ({ input, ctx }) => {
      return await ctx.prisma.exerciseRequest.create({
        data: {
          ...input,
          type: 'update',
          user: {
            connect: {
              id: ctx.session.user.id,
            },
          },
        },
      })
    }),
  // Returns a single request by ID
  getById: userProcedure.input(z.string()).query(async ({ input, ctx }) => {
    return await ctx.prisma.exerciseRequest.findUnique({
      where: {
        id: input,
      },
    })
  }),
  // EDITOR
  // Returns all requests
  getAll: editorProcedure
    .input(selectExerciseInput)
    .query(async ({ input, ctx }) => {
      return await ctx.prisma.exerciseRequest.findMany({
        select: selectedInput(input),
      })
    }),
  // Archives a single request by ID
  archiveById: editorProcedure
    .input(z.string())
    .mutation(async ({ input, ctx }) => {
      return await ctx.prisma.exerciseRequest.update({
        where: { id: input },
        data: { archived: true },
      })
    }),
})
