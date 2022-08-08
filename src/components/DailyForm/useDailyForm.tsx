import { HydratedDocument } from 'mongoose'
import { useRouter } from 'next/router'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Daily, DailyWorkout } from 'types/daily.types'
import { DailyFormProps } from './DailyForm'

const defaultDaily: Daily = {
  slug: 'Default',
  startDate: new Date().toISOString().slice(0, 10),
  settings: {
    maxReps: 30,
    startReps: 35,
    maxSets: 3,
    repRatio: [40, 35, 25],
  },
  workouts: [],
}

const useDailyForm = ({ method, dailyFill }: DailyFormProps) => {
  const router = useRouter()
  const methods = useForm<Daily>({
    defaultValues: !dailyFill ? defaultDaily : dailyFill,
  })

  const handleSubmit: SubmitHandler<Daily> = (values, event) => {
    event?.preventDefault()
    const url = method == 'PUT' ? `api/daily/${dailyFill?.id}` : 'api/daily'
    const redirect = `/daily/${values.slug}`

    fetch(url, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    })
      .then(async (response) => {
        const data = await response.json()

        if (!response.ok) {
          throw data
        }

        if (method == 'PUT') {
          return router.push(redirect)
        }

        return data
      })
      .catch((error) => {
        console.error(error)
      })
  }

  return {
    methods,
    handleSubmit: methods.handleSubmit(handleSubmit),
  }
}

export default useDailyForm
