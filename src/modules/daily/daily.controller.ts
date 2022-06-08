import { DailyModel } from 'modules/daily/daily.model'
import { NextApiHandler } from 'next'
import { ApiError } from 'next/dist/server/api-utils'
import createDaily from './daily.service'

export const getDaily: NextApiHandler = async (req, res) => {
  const { slug } = req.query
  const daily = await DailyModel.findOne({ slug: slug }).populate({
    path: 'workouts',
    populate: {
      path: 'exercises.exercise',
    },
  })

  if (!daily) {
    throw new ApiError(404, `${slug} not found`)
  }

  try {
    const dailyWorkout = await createDaily(daily)
    return res.status(200).json(dailyWorkout)
  } catch (error) {
    throw error
  }
}

export const createNewDaily: NextApiHandler = async (req, res) => {
  // TODO: #9 Add update handler to DailyAPI
}

export const updateDaily: NextApiHandler = async (req, res) => {
  // TODO: #9 Add update handler to DailyAPI
}

export const deleteDaily: NextApiHandler = async (req, res) => {
  // TODO: #9 Add update handler to DailyAPI
}
