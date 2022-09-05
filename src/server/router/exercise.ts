import { z } from 'zod'
import { createRouter } from './context'
import { createProtectedRouter } from './protected-router'

export const exerciseSchema = z.object({
  name: z.string(),
  slug: z.string(),
  alias: z.array(z.string()),
  primary: z.array(z.string()),
  secondary: z.array(z.string()),
})

export type IExerciseSchema = z.infer<typeof exerciseSchema>

export const exerciseRouter = createRouter()
  .query('getAll', {
    async resolve({ ctx }) {
      return await ctx.prisma.exercise.findMany()
    },
  })
  .query('getById', {
    input: z.string(),
    async resolve({ input, ctx }) {
      return await ctx.prisma.exercise.findUnique({
        where: {
          id: input,
        },
      })
    },
  })

export const editorExerciseRouter = createProtectedRouter('isEditor')
  .mutation('create', {
    input: exerciseSchema,
    async resolve({ input, ctx }) {
      return await ctx.prisma.exercise.create({
        data: input,
      })
    },
  })
  .mutation('updateById', {
    input: z.object({
      id: z.string(),
      data: exerciseSchema,
    }),
    async resolve({ input, ctx }) {
      return await ctx.prisma.exercise.update({
        where: {
          id: input.id,
        },
        data: input.data,
      })
    },
  })

export const editorRequestRouter = createProtectedRouter('isEditor')
  // Returns all requests
  .query('getAll', {
    async resolve({ ctx }) {
      return await ctx.prisma.exerciseRequest.findMany()
    },
  })
  // Archives a single request by ID
  .mutation('archiveById', {
    input: z.string(),
    async resolve({ input, ctx }) {
      return await ctx.prisma.exerciseRequest.update({
        where: { id: input },
        data: { archived: true },
      })
    },
  })

export const requestRouter = createProtectedRouter()
  // Creates new request for a new exercise to be added
  .mutation('create', {
    input: exerciseSchema,
    async resolve({ input, ctx }) {
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
    },
  })
  // Creates new request to update an existing exercise
  .mutation('update', {
    input: exerciseSchema,
    async resolve({ input, ctx }) {
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
    },
  })
  // Returns a single request by ID
  .query('getById', {
    input: z.string(),
    async resolve({ input, ctx }) {
      return await ctx.prisma.exerciseRequest.findUnique({
        where: {
          id: input,
        },
      })
    },
  })
