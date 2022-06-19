import { Schema, model, models, Types, Model } from 'mongoose'
import { IWorkout, RoundExerciseTypeEnum } from 'types/workout.types'

const options = {
  toJSON: { virtuals: true },
}

const WorkoutSchema = new Schema<IWorkout>(
  {
    title: {
      type: String,
      required: [true, 'Title cannot be empty'],
    },
    slug: {
      type: String,
      unique: true,
      required: [true, 'Slug cannot be empty'],
    },
    timer: {
      _id: false,
      countdown: {
        type: Boolean,
        default: true,
      },
      countFrom: {
        type: Number,
        default: 3,
      },
      readExercise: {
        type: Boolean,
        default: true,
      },
    },
    settings: {
      _id: false,
      setRest: {
        type: Number,
        default: 60,
      },
    },
    sets: [
      {
        _id: false,
        title: String,
        exerciseRest: Number,
        tabata: Boolean,
        iterations: Number,
        round: [
          {
            _id: false,
            exercise: {
              type: Types.ObjectId,
              ref: 'Exercise',
            },
            custom: String,
            type: {
              type: String,
              enum: [
                RoundExerciseTypeEnum.Time,
                RoundExerciseTypeEnum.Rep,
                RoundExerciseTypeEnum.Length,
              ],
              default: RoundExerciseTypeEnum.Time,
            },
            amount: {
              type: Number,
              default: 30,
            },
            split: {
              type: Boolean,
              default: false,
            },
            splitBreak: {
              type: Number,
              default: 15,
            },
            splitTitle: {
              type: [String],
              default: ['Right', 'Left'],
            },
            excludeRead: Boolean,
          },
        ],
      },
    ],
  },
  options
)

const Workout: Model<IWorkout> =
  models.Workout || model('Workout', WorkoutSchema)

export default Workout
