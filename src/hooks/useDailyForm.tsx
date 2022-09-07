import { DailyFormProps } from 'components/daily/DailyForm'
import { DailySchema } from 'lib/validation/daily'
import { useRouter } from 'next/router'
import { SubmitHandler, useForm } from 'react-hook-form'

const defaultDaily: DailySchema = {
  slug: 'New Workout',
  startDate: new Date(),
  maxReps: 30,
  startReps: 35,
  maxSets: 3,
  repRatio: [40, 35, 25],
  workouts: [],
}

const useDailyForm = ({ method, dailyFill }: DailyFormProps) => {
  const router = useRouter()
  const methods = useForm<DailySchema>({
    defaultValues: !dailyFill ? defaultDaily : dailyFill,
  })

  const handleSubmit: SubmitHandler<DailySchema> = (values, event) => {
    event?.preventDefault()
    const url = method == 'PUT' ? `api/daily/${dailyFill?.id}` : 'api/daily'
    const redirect = `/daily/${values.slug}`
    values.slug = values.slug.toLowerCase().replace(/[^\w]/gi, '')

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
        console.log(response)
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
