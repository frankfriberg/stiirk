import { Prisma } from '@prisma/client'

export type DailyPayload = Prisma.DailyGetPayload<{
  include: {
    workouts: {
      include: {
        exercises: {
          include: {
            exercise: true
          }
        }
      }
    }
  }
}>

export type DailyExercisePayload = Prisma.DailyExerciseGetPayload<{
  include: {
    exercise: true
  }
}>
