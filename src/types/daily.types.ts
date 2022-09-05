import { Exercise } from './exercise.types'

// Daily Model

export interface Daily {
  slug: string
  startDate: Date | string
  settings: DailyWorkoutSettings
  workouts?: Array<DailyWorkout>
}

interface DailyWorkoutSettings {
  maxReps: number
  startReps: number
  maxSets: number
  repRatio: number[]
}

// Daily Workout Model

export interface DailyWorkout {
  title: string
  numberOfExercises?: number
  exercises: Array<DailyExercise>
}

export interface DailyExercise {
  exercise: Exercise
  max: number
  min: number
  leftright: boolean
}

// Daily Workout API return

interface ReturningExercise {
  name: string
  reps: number[]
}

export interface ReturnedDailyWorkout {
  title: string
  numberOfExercises: number
  todaysReps: number
  todaysNumber: number
  exercises: Array<ReturningExercise>
}
