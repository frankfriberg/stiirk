import { DailyModel } from 'modules/daily/daily.model'
import { ReturnedDailyWorkout } from 'types/daily.types'
import createDaily from './daily.service'

export async function getDaily(
  slug: string | string[]
): Promise<ReturnedDailyWorkout | Error> {
  const daily = await DailyModel.findOne({ slug: slug }).populate({
    path: 'workouts',
    populate: {
      path: 'exercises.exercise',
    },
  })

  if (!daily) {
    throw new Error(`${slug} not found`)
  }

  return createDaily(daily).then((dailyWorkout) => dailyWorkout)
}
