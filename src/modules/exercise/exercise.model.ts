import { Schema, model, models, Model, HydratedDocument } from 'mongoose'
import { ApiError } from 'next/dist/server/api-utils'
import { Exercise } from 'types/exercise.types'

const options = {
  toJSON: { virtuals: true },
}

const ExerciseSchema = new Schema<Exercise, Model<Exercise>>(
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
      _id: false,
      type: String,
      enum: ['push', 'pull'],
      default: 'push',
    },
  },
  options
)

ExerciseSchema.post(
  'save',
  (error: any, doc: HydratedDocument<Exercise>, next: Function) => {
    if (error.name === 'MongoServerError' && error.code === 11000) {
      throw new ApiError(400, `Exercise "${doc.slug}" already exists`)
    } else {
      next()
    }
  }
)

const Exercise = models.Exercise || model<Exercise>('Exercise', ExerciseSchema)

export default Exercise
