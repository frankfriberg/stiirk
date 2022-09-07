import { z } from 'zod'
import { ExerciseType } from '@prisma/client'

export const workoutRoundSchema = z.object({
  custom: z.string().optional(),
  type: z.nativeEnum(ExerciseType),
  amount: z.number(),
  split: z.boolean(),
  splitBreak: z.number(),
  splitTitle: z.array(z.string()).max(2),
  excludeRead: z.boolean(),
  exerciseId: z.string().optional(),
})

export const workoutSetSchema = z.object({
  name: z.string(),
  exerciseRest: z.number(),
  tabata: z.boolean(),
  iterations: z.number(),
  rounds: z.array(workoutRoundSchema),
})

export const workoutSchema = z.object({
  public: z.boolean(),
  name: z.string(),
  slug: z.string(),
  timerCountdown: z.boolean(),
  timerCountFrom: z.number(),
  timerReadExercise: z.boolean(),
  setRest: z.number(),
  sets: z.array(workoutSetSchema),
})

export type WorkoutSchema = z.infer<typeof workoutSchema>
