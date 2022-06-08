import { Schema, models, model, Document, Model } from 'mongoose'
import { ExerciseModel } from '../exercise/exercise.model'

import { Daily, DailyWorkout } from 'types/daily.types'

const DailySchema = new Schema<Daily>({
  slug: {
    type: String,
    required: [true, 'Please provide an identifier.'],
    maxlength: [50, 'Identifier cant be longer than 50 characters.'],
  },
  startDate: {
    type: Schema.Types.Date,
    required: [true, 'Please provide a start date.'],
  },
  settings: {
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
})

const DailyWorkoutSchema = new Schema<DailyWorkout>({
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
})

const DailyModel = models.Daily || model('Daily', DailySchema)
const DailyWorkoutModel =
  models.DailyWorkout || model('DailyWorkout', DailyWorkoutSchema)

export { DailyModel, DailyWorkoutModel }
