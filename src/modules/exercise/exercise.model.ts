import { Schema, model, models } from 'mongoose'
import { ApiError } from 'next/dist/server/api-utils'
import { Exercise } from 'types/exercise.types'

const ExerciseSchema = new Schema<Exercise>({
  title: {
    type: String,
    required: [true, 'Title cannot be empty.'],
  },
  slug: {
    type: String,
    required: [true, 'Slug cannot be empty'],
    unique: true,
  },
  primary: [String],
  secondary: [String],
  force: {
    type: String,
    enum: ['push', 'pull'],
    default: 'push',
  },
})

ExerciseSchema.post('save', (error: any, doc: Exercise, next: Function) => {
  if (error.name === 'MongoServerError' && error.code === 11000) {
    next(new ApiError(400, `Exercise "${doc.slug}" already exists`))
  } else {
    next()
  }
})

const ExerciseModel = models.Exercise || model('Exercise', ExerciseSchema)

export { ExerciseModel, ExerciseSchema }
