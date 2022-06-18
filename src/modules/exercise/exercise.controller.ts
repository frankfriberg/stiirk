import { ApiReturn, StiirkApiHandler } from 'lib/apiHandler'
import { ValidationError } from 'lib/errorHandler'
import { ApiError } from 'next/dist/server/api-utils'
import Exercise from './exercise.model'

// CREATE
export const createNewExercise: StiirkApiHandler = ({ body }) => {
  return Exercise.create(body)
    .then((exercise) => ApiReturn(201, exercise))
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

// READ
export function getAllExercises() {
  return Exercise.find({})
    .then((exercises) => ApiReturn(200, exercises))
    .catch((error) => error)
}

export const getExerciseBySlug: StiirkApiHandler = ({ slug }) => {
  return Exercise.findOne({ slug: slug })
    .then((exercise) => {
      if (!exercise) throw new ApiError(404, `Exercise ${slug} not found.`)
      return ApiReturn(200, exercise)
    })
    .catch((error) => error)
}

// UPDATE
export const updateExerciseById: StiirkApiHandler = ({ id, body }) => {
  return Exercise.findByIdAndUpdate(id, body, {
    new: true,
  })
    .then((exercise) => {
      if (!exercise) throw new ApiError(404, `Exercise id: ${id} not found`)
    })
    .catch((error) => error)
}

// DELETE
export const deleteExerciseById: StiirkApiHandler = ({ id }) => {
  return Exercise.findByIdAndDelete(id)
    .then((deletedExercise) => {
      if (!deletedExercise)
        throw new ApiError(404, `Exercise id: ${id} not found`)
      return ApiReturn(200, deletedExercise)
    })
    .catch((error) => error)
}

export const deleteAllExercises: StiirkApiHandler = () => {
  return Exercise.deleteMany({})
    .then(() => 'Deleted all exercises')
    .catch((error) => error)
}
