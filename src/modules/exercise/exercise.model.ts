import { Schema, model, models, Model } from 'mongoose'
import { ApiError } from 'next/dist/server/api-utils'
import { IExercise } from 'types/exercise.types'

const options = {
  toJSON: { virtuals: true },
}

const ExerciseSchema = new Schema<IExercise>(
  {
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
  },
  options
)

ExerciseSchema.post('save', (error: any, doc: IExercise, next: Function) => {
  if (error.name === 'MongoServerError' && error.code === 11000) {
    throw new ApiError(400, `Exercise "${doc.slug}" already exists`)
  } else {
    next()
  }
})

const Exercise: Model<IExercise> =
  models.Exercise || model('Exercise', ExerciseSchema)

export default Exercise
