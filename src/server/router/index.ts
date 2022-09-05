// src/server/router/index.ts
import { createRouter } from './context'
import superjson from 'superjson'

import { dailyRouter } from './daily'
import { exerciseRouter } from './exercise'
import { workoutRouter } from './workout'

export const appRouter = createRouter()
  .transformer(superjson)
  .merge('daily.', dailyRouter)
  .merge('exercise.', exerciseRouter)
  .merge('workout.', workoutRouter)

// export type definition of API
export type AppRouter = typeof appRouter
