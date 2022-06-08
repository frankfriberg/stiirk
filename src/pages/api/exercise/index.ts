import {
  createExercise,
  deleteAllExercises,
  listExercises,
} from 'modules/exercise/exercise.controller'
import { apiHandler } from 'lib/apiHandler'

export default apiHandler({
  get: listExercises,
  post: createExercise,
  delete: deleteAllExercises,
})
