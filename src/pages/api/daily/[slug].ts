import {
  getDailyBySlug,
  updateDailyById,
  deleteDailyById,
} from 'modules/daily/daily.controller'
import { apiHandler } from 'lib/apiHandler'

export default apiHandler({
  get: getDailyBySlug,
  put: updateDailyById,
  delete: deleteDailyById,
})
