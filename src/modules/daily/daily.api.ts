import { NextApiRequest, NextApiResponse } from 'next'
import { DailyModel } from 'modules/daily/daily.model'
import createDaily from './daily.service'

export function getDaily(req: NextApiRequest, res: NextApiResponse) {
  const { slug } = req.query
  DailyModel.findOne({ slug: slug })
    .populate({
      path: 'workouts',
      populate: {
        path: 'exercises.exercise',
      },
    })
    .then((daily) => {
      if (daily) {
        createDaily(daily).then((dailyWorkout) => {
          return res.status(200).json(dailyWorkout)
        })
      }
      throw new Error(`${slug} not found`)
    })
    .catch((error) => {
      return res.status(404).json({ success: false, message: error.message })
    })
}
