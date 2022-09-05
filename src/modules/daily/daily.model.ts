import { Schema, models, model, Model } from 'mongoose'
import { Daily, DailyWorkout } from 'types/daily.types'

const options = {
  toJSON: { virtuals: true },
}

const DailySchema = new Schema<Daily>(
  {
    slug: {
      type: String,
      required: [true, 'Please provide an identifier.'],
      maxlength: [50, 'Identifier cant be longer than 50 characters.'],
      unique: true,
    },
    startDate: {
      type: Schema.Types.Date,
      required: [true, 'Please provide a start date.'],
    },
    settings: {
      _id: false,
      maxReps: {
        type: Number,
        default: 20,
      },
      startReps: {
        type: Number,
        default: 35,
      },
      maxSets: {
        type: Number,
        default: 3,
      },
      repRatio: {
        type: [Number],
        default: [40, 34, 26],
      },
    },
    workouts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'DailyWorkout',
      },
    ],
  },
  options
)

const DailyWorkoutSchema = new Schema<DailyWorkout>(
  {
    title: {
      type: String,
      required: [true, 'Please provide a title for workout.'],
    },
    numberOfExercises: Number,
    exercises: [
      {
        _id: false,
        exercise: {
          type: Schema.Types.ObjectId,
          ref: 'Exercise',
        },
        max: {
          type: Number,
          default: 20,
        },
        min: {
          type: Number,
          default: 10,
        },
        leftright: {
          type: Boolean,
          default: false,
        },
      },
    ],
  },
  options
)

DailyWorkoutSchema.pre('save', function (next) {
  this.set({ numberOfExercises: this.exercises.length })
  next()
})

const Daily: Model<Daily> = models.Daily || model<Daily>('Daily', DailySchema)
const DailyWorkout: Model<DailyWorkout> =
  models.DailyWorkout || model('DailyWorkout', DailyWorkoutSchema)

export { Daily, DailyWorkout }
