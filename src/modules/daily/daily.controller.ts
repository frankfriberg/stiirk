import { ApiReturn, StiirkApiHandler } from 'lib/apiHandler'
import { ValidationError } from 'lib/errorHandler'
import { Daily, DailyWorkout } from 'modules/daily/daily.model'
import { ApiError } from 'next/dist/server/api-utils'
import createDaily from './daily.service'

// Daily

export const createNewDaily: StiirkApiHandler = (params) => {
  const { body } = params
  return Daily.create(body)
    .then((createdDaily) => ApiReturn(201, createdDaily))
    .catch((error) => {
      if (error.name === 'ValidationError') {
        let valErrors = {}

        Object.keys(error.errors).forEach((key) => {
          valErrors[key as keyof Object] = error.errors[key].message
        })

        throw new ValidationError(400, error.name, valErrors)
      }
      throw error
    })
}

export const getDailyBySlug: StiirkApiHandler = async (params) => {
  const { slug } = params
  return Daily.findOne({ slug: slug })
    .populate({
      path: 'workouts',
      populate: {
        path: 'exercises.exercise',
      },
    })
    .then(async (daily) => {
      if (!daily) throw new ApiError(404, `${slug} not found`)
      const dailyWorkout = await createDaily(daily)
      return ApiReturn(200, daily)
    })
    .catch((error) => error)
}

export const updateDailyById: StiirkApiHandler = (params) => {
  const { body } = params
  return Daily.findByIdAndUpdate(body.id, body)
    .then((updatedDaily) => {
      if (!updatedDaily)
        throw new ApiError(404, `Daily id: ${body.id} not found.`)
      return ApiReturn(200, updatedDaily)
    })
    .catch((error) => error)
}

export const deleteDailyById: StiirkApiHandler = (params) => {
  const { body } = params
  return Daily.findByIdAndDelete(body.id)
    .then((deletedDaily) => {
      if (!deletedDaily)
        throw new ApiError(404, `Daily id: ${body.id} not found.`)
      return ApiReturn(204, deletedDaily)
    })
    .catch((error) => error)
}

// Daily Workout
export const createNewDailyWorkout: StiirkApiHandler = ({ body }) => {
  return DailyWorkout.create(body)
    .then((createdDailyWorkout) => ApiReturn(201, createdDailyWorkout))
    .catch((error) => {
      if (error.name === 'ValidationError') {
        let valErrors = {}

        Object.keys(error.errors).forEach((key) => {
          valErrors[key as keyof Object] = error.errors[key].message
        })

        throw new ValidationError(400, error.name, valErrors)
      }
      throw error
    })
}

export const getAllDailyWorkouts = () => {
  return DailyWorkout.find({})
    .then((DailyWorkouts) => ApiReturn(200, DailyWorkouts))
    .catch((error) => error)
}

export const getDailyWorkoutById: StiirkApiHandler = ({ id }) => {
  return DailyWorkout.findById(id)
    .then((workout) => {
      if (!workout) throw new ApiError(404, `Daily Workout #${id} not found.`)
      return ApiReturn(200, workout)
    })
    .catch((error) => error)
}
