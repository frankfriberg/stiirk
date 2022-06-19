import { IExercise } from './exercise.types'
import { StiirkDocument } from './mongoose.types'

export interface Daily {
  slug: string
  startDate: Date
  settings: DailyWorkoutSettings
  workouts: DailyWorkout[]
}

export interface IDaily extends Daily, StiirkDocument {}

interface DailyWorkoutSettings {
  maxReps: number
  startReps: number
  maxSets: number
  repRatio: number[]
}

export interface DailyWorkout {
  title: string
  numberOfExercises: number
  exercises: DailyExercise[]
}

export interface IDailyWorkout extends DailyWorkout, StiirkDocument {}

interface DailyExercise {
  exercise: IExercise
  max: number
  min: number
  leftright: boolean
}

interface ReturningExercise {
  name: string
  reps: number[]
}

export interface ReturnedDailyWorkout {
  title: string
  numberOfExercises: number
  todaysReps: number
  todaysNumber: number
  exercises: ReturningExercise[]
}
