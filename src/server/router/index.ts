// src/server/router/index.ts
import superjson from 'superjson'
import { createRouter } from './context'

import { dailyRouter, userDailyRouter } from './daily'
import {
  editorExerciseRouter,
  editorRequestRouter,
  exerciseRouter,
  requestRouter,
} from './exercise'
import { userRouter } from './user'
import { userWorkoutRouter, workoutRouter } from './workout'

export const appRouter = createRouter()
  .transformer(superjson)
  .merge('user.', userRouter)
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
