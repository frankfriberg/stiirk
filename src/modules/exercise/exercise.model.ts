import { Schema, model, models, Model } from 'mongoose'
import { Exercise } from 'types/exercise.types'

const ExerciseSchema = new Schema<Exercise>({
  title: {
    type: String,
    required: [true, 'Title cannot be empty.'],
  },
  slug: {
    type: String,
    required: [true, 'Slug cannot be empty'],
  },
  primary: [String],
  secondary: [String],
  force: {
    type: String,
    enum: ['push', 'pull'],
    default: 'push',
  },
})

const ExerciseModel = models.Exercise || model('Exercise', ExerciseSchema)

export { ExerciseModel, ExerciseSchema }
