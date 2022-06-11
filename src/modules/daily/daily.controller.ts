import { apiReturn, StiirkApiHandler } from 'lib/apiHandler'
import { Daily } from 'modules/daily/daily.model'
import { ApiError } from 'next/dist/server/api-utils'
import createDaily from './daily.service'

export const createNewDaily: StiirkApiHandler = (params) => {
  const { body } = params
  return Daily.create(body)
    .then((createdDaily) => apiReturn(201, createdDaily))
    .catch((error) => error)
}

export const getDailyBySlug: StiirkApiHandler = async (params) => {
  const { slug } = params
  return Daily.findOne({ slug: slug })
    .populate({
      path: 'workouts',
      populate: {
        path: 'exercises.exercise',
      },
    })
    .then(async (daily) => {
      if (!daily) throw new ApiError(404, `${slug} not found`)
      const dailyWorkout = await createDaily(daily)
      return apiReturn(200, daily)
    })
    .catch((error) => error)
}

export const updateDailyById: StiirkApiHandler = (params) => {
  const { body } = params
  return Daily.findByIdAndUpdate(body.id, body)
    .then((updatedDaily) => {
      if (!updatedDaily)
        throw new ApiError(404, `Daily id: ${body.id} not found.`)
      return apiReturn(200, updatedDaily)
    })
    .catch((error) => error)
}

export const deleteDailyById: StiirkApiHandler = (params) => {
  const { body } = params
  return Daily.findByIdAndDelete(body.id)
    .then((deletedDaily) => {
      if (!deletedDaily)
        throw new ApiError(404, `Daily id: ${body.id} not found.`)
      return apiReturn(204, deletedDaily)
    })
    .catch((error) => error)
}
