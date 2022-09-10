import { z } from 'zod'
import { ExerciseType } from '@prisma/client'
import { exerciseSchema } from './exercise'

export const dailyExerciseSchema = z.object({
  min: z.number().min(1),
  max: z.number().min(1),
  split: z.boolean(),
  type: z.nativeEnum(ExerciseType),
  exercise: exerciseSchema.extend({
    id: z.string(),
  }),
})

export const dailyWorkoutSchema = z.object({
  name: z.string().min(1),
  exercises: z.array(dailyExerciseSchema).optional(),
})

export const dailySchema = z.object({
  slug: z.string().min(1),
  startDate: z.date(),
  maxReps: z.number().min(1),
  startReps: z.number().min(1),
  maxSets: z.number().min(1),
  repRatio: z.array(z.number()),
  workouts: z.array(dailyWorkoutSchema).optional(),
})

export type DailySchema = z.infer<typeof dailySchema>
export type DailyExerciseSchema = z.infer<typeof dailyExerciseSchema>
export type DailyWorkoutSchema = z.infer<typeof dailyWorkoutSchema>
