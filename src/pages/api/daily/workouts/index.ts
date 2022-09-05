import {
  createNewDailyWorkout,
  getAllDailyWorkouts,
} from 'modules/daily/daily.controller'
import { apiHandler } from 'lib/apiHandler'

export default apiHandler({
  post: createNewDailyWorkout,
  get: getAllDailyWorkouts,
})
