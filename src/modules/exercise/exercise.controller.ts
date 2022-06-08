import { apiReturn } from 'lib/apiHandler'
import { ValidationError } from 'lib/errorHandler'
import { NextApiHandler } from 'next'
import Exercise from './exercise.model'

export async function listExercises() {
  const exercises = await Exercise.find({})

  return Exercise.find({})
    .then((exercises) => apiReturn(200, exercises))
    .catch((error) => error)
}

export const createExercise: NextApiHandler = (req, res) => {
  const data = req.body

  return Exercise.create(data)
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

export function getExerciseBySlug(slug: string) {
  return Exercise.findOne({ slug: slug })
    .then((exercise) => apiReturn(200, exercise))
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
