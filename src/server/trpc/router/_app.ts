import { router } from '../trpc'

import { dailyRouter } from './daily'
import { exerciseRouter } from './exercise'
import { userRouter } from './user'
import { workoutRouter } from './workout'

export const appRouter = router({
  daily: dailyRouter,
  exercise: exerciseRouter,
  user: userRouter,
  workout: workoutRouter,
})

// export type definition of API
export type AppRouter = typeof appRouter
