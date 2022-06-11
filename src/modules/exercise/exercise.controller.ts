import { apiReturn, StiirkApiHandler } from 'lib/apiHandler'
import { ValidationError } from 'lib/errorHandler'
import { NextApiHandler } from 'next'
import { ApiError } from 'next/dist/server/api-utils'
import Exercise from './exercise.model'

export function listExercises() {
  return Exercise.find({})
    .then((exercises) => apiReturn(200, exercises))
    .catch((error) => error)
}

export const createExercise: StiirkApiHandler = (params) => {
  const { body } = params

  return Exercise.create(body)
    .then((exercise) => apiReturn(201, exercise))
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

export const getExerciseBySlug: StiirkApiHandler = (params) => {
  return Exercise.findOne({ slug: params.slug })
    .then((exercise) => {
      if (!exercise)
        throw new ApiError(404, `Exercise ${params.slug} not found.`)
      return apiReturn(200, exercise)
    })
    .catch((error) => error)
}

export const editExercise: NextApiHandler = (req, res) => {
  const data = req.body
  const { id } = req.query

  return Exercise.findByIdAndUpdate(id, data, {
    new: true,
  })
    .then((exercise) => exercise)
    .catch((error) => error)
}

export const deleteExercise: NextApiHandler = (req, res) => {
  // TODO: #8 Add delete handler to ExerciseAPI
}

export const deleteAllExercises: NextApiHandler = (req, res) => {
  return Exercise.deleteMany({})
    .then(() => 'Deleted all exercises')
    .catch((error) => error)
}
