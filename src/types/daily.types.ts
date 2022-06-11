import { IExercise } from './exercise.types'
import { StiirkDocument } from './mongoose.types'

interface ReturningExercise {
  name: string
  reps: number[]
}

export interface IDaily extends StiirkDocument {
  slug: string
  startDate: Date
  settings: IDailyWorkoutSettings
  workouts: IDailyWorkout[]
}

export interface IDailyWorkoutSettings extends StiirkDocument {
  maxReps: number
  startReps: number
  maxSets: number
  repRatio: number[]
}

export interface IDailyWorkout extends StiirkDocument {
  title: string
  numberOfExercises: number
  exercises: DailyExercise[]
}

export interface DailyExercise {
  exercise: IExercise
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
