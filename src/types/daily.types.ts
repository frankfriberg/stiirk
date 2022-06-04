import { Exercise } from './exercise.types'
import { StiirkDocument } from './mongoose.types'

interface ReturningExercise {
  name: string
  reps: number[]
}

export interface Daily extends StiirkDocument {
  slug: string
  startDate: Date
  settings: DailyWorkoutSettings
  workouts: DailyWorkout[]
}

export interface DailyWorkoutSettings extends StiirkDocument {
  maxReps: number
  startReps: number
  maxSets: number
  repRatio: number[]
}

export interface DailyWorkout extends StiirkDocument {
  title: string
  numberOfExercises: number
  exercises: DailyExercise[]
}

export interface DailyExercise extends StiirkDocument {
  exercise: Exercise
  max: number
  min: number
  leftright: boolean
}

export interface ReturnedDailyWorkout {
  title: string
  numberOfExercises: number
  todaysReps: number
  todaysNumber: number
  exercises: ReturningExercise[]
}
