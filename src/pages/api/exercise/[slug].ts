import {
  getExerciseBySlug,
  updateExerciseById,
  deleteExerciseById,
} from 'modules/exercise/exercise.controller'
import { apiHandler } from 'lib/apiHandler'

export default apiHandler({
  get: getExerciseBySlug,
  put: updateExerciseById,
  delete: deleteExerciseById,
})
