import { ValidationError } from 'lib/errorHandler'
import { NextApiHandler } from 'next'
import { ApiError } from 'next/dist/server/api-utils'
import { ExerciseModel } from './exercise.model'

export const listExercises: NextApiHandler = (req, res) => {
  return ExerciseModel.find({})
    .then((exercises) => res.status(200).json(exercises))
    .catch((error) => error)
}

export const createExercise: NextApiHandler = (req, res) => {
  const data = req.body

  return ExerciseModel.create(data)
    .then((exercise) => res.status(201).json(exercise))
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

export const editExercise: NextApiHandler = (req, res) => {
  const data = req.body
  const { id } = req.query

  return ExerciseModel.findByIdAndUpdate(id, data, {
    new: true,
  })
    .then((exercise) => exercise)
    .catch((error) => error)
}

export const deleteExercise: NextApiHandler = (req, res) => {}

export const deleteAllExercises: NextApiHandler = (req, res) => {
  return ExerciseModel.deleteMany({})
    .then(() => 'Deleted all exercises')
    .catch((error) => error)
}
