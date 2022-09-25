// src/server/router/index.ts
import { createRouter } from './context'
import superjson from 'superjson'

import { dailyRouter, userDailyRouter } from './daily'
import {
  editorExerciseRouter,
  editorRequestRouter,
  exerciseRouter,
  requestRouter,
} from './exercise'
import { userWorkoutRouter, workoutRouter } from './workout'

export const appRouter = createRouter()
  .transformer(superjson)
  .merge('daily.', dailyRouter)
  .merge('daily.u.', userDailyRouter)
  .merge('exercise.', exerciseRouter)
  .merge('exercise.a.', editorExerciseRouter)
  .merge('request', requestRouter)
  .merge('request.a.', editorRequestRouter)
  .merge('workout.', workoutRouter)
  .merge('workout.u.', userWorkoutRouter)

// export type definition of API
export type AppRouter = typeof appRouter
