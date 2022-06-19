import { StiirkDocument } from './mongoose.types'

export enum ExerciseForceEnum {
  Push = 'push',
  Pull = 'pull',
}

export interface Exercise {
  title: string
  slug: string
  primary?: string[]
  secondary?: string[]
  force: string
}

export interface IExercise extends Exercise, StiirkDocument {}
