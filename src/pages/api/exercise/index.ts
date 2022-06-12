import {
  createNewExercise,
  getAllExercises,
  deleteAllExercises,
} from 'modules/exercise/exercise.controller'
import { apiHandler } from 'lib/apiHandler'

export default apiHandler({
  get: getAllExercises,
  post: createNewExercise,
  delete: deleteAllExercises,
})
