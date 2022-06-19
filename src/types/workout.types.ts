import { IExercise } from './exercise.types'
import { StiirkDocument } from './mongoose.types'

export interface Workout {
  title: string
  slug: string
  timer?: WorkoutTimerSettings
  settings?: WorkoutSettings
  sets: WorkoutSet
}

export interface IWorkout extends Workout, StiirkDocument {}

interface WorkoutTimerSettings {
  countdown: boolean
  countFrom: number
  readExercises: boolean
}

interface WorkoutSettings {
  setRest: number
}

interface WorkoutSet {
  title: string
  exerciseRest: number
  tabata: boolean
  iterations: number
  round: SetRound
}

interface SetRound {
  exercise?: IExercise
  custom: string
  type: RoundExerciseTypeEnum
  amount: number
  split: boolean
  splitBreak: number
  splitTitle: string[]
  exckudeRead: boolean
}

export enum RoundExerciseTypeEnum {
  Time = 'time',
  Rep = 'repetition',
  Length = 'length',
}
