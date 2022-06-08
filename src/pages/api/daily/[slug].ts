import { getDaily } from 'modules/daily/daily.controller'
import { apiHandler } from 'lib/apiHandler'

export default apiHandler({
  get: getDaily,
})
