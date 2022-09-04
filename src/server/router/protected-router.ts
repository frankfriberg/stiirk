import * as trpc from '@trpc/server'
import { createRouter } from './context'

/**
 * Creates a tRPC router that asserts all queries and mutations are from an authorized user. Will throw an unauthorized error if a user is not signed in.
 */
export function createProtectedRouter(type?: 'isEditor' | 'isAdmin') {
  return createRouter().middleware(({ ctx, next }) => {
    if (!ctx.session || !ctx.session.user) {
      throw new trpc.TRPCError({ code: 'UNAUTHORIZED' })
    }

    const isAdmin = ctx.session.user.isAdmin
    const isEditor = ctx.session.user.isEditor

    if (type) {
      if (
        (type == 'isAdmin' && !isAdmin) ||
        (type == 'isEditor' && (!isEditor || !isAdmin))
      ) {
        throw new trpc.TRPCError({ code: 'FORBIDDEN' })
      }
    }

    return next({
      ctx: {
        ...ctx,
        session: { ...ctx.session, user: ctx.session.user },
      },
    })
  })
}
