import { ApiReturn, StiirkApiHandler } from 'lib/apiHandler'
import { ValidationError } from 'lib/errorHandler'
import { ApiError } from 'next/dist/server/api-utils'
import Workout from './workout.model'

// Create
export const createNewWorkout: StiirkApiHandler = ({ body }) => {
  return Workout.create(body)
    .then((workout) => ApiReturn(201, workout))
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

// Read
export const getAllWorkouts: StiirkApiHandler = () => {
  return Workout.find({})
    .then((workouts) => ApiReturn(200, workouts))
    .catch((error) => error)
}

export const getWorkoutBySlug: StiirkApiHandler = ({ slug }) => {
  return Workout.findOne({ slug: slug })
    .then((workout) => {
      if (!workout) throw new ApiError(404, `Workout ${slug} not found`)
      return ApiReturn(200, workout)
    })
    .catch((error) => error)
}

// Update
export const updateWorkoutById: StiirkApiHandler = ({ id, body }) => {
  return Workout.findByIdAndUpdate(id, body, { new: true })
    .then((workout) => {
      if (!workout) throw new ApiError(404, `Workout id: ${id} not found`)
      return ApiReturn(200, workout)
    })
    .catch((error) => error)
}

// Delete
export const deleteWorkoutById: StiirkApiHandler = ({ id }) => {
  return Workout.findByIdAndDelete(id)
    .then((deletedWorkout) => {
      if (!deletedWorkout)
        throw new ApiError(404, `Workout id: ${id} not found`)
      return ApiReturn(200, deletedWorkout)
    })
    .catch((error) => error)
}
