import { StiirkDocument } from './mongoose.types'

export enum ExerciseForceEnum {
  Push = 'push',
  Pull = 'pull',
}

export interface IExercise extends StiirkDocument {
  title: string
  slug: string
  primary?: string[]
  secondary?: string[]
  force: string
}
