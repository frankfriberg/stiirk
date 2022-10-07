import { zodResolver } from '@hookform/resolvers/zod'
import { DailyFormProps } from 'components/daily/DailyForm'
import { dailySchema, DailySchema } from 'lib/validation/daily'
import { SubmitHandler, useForm } from 'react-hook-form'
import { trpc } from 'utils/trpc'

const defaultDaily: DailySchema = {
  id: '0',
  slug: 'New Workout',
  startDate: new Date(),
  maxReps: 30,
  startReps: 35,
  maxSets: 3,
  repRatio: [40, 35, 25],
  workouts: [],
}

const useDailyForm = ({ put, dailyFill }: DailyFormProps) => {
  const methods = useForm<DailySchema>({
    defaultValues: !dailyFill ? defaultDaily : dailyFill,
    resolver: zodResolver(dailySchema),
  })
  const mutation = put
    ? trpc.useMutation(['daily.u.create'])
    : trpc.useMutation(['daily.u.updateById'])

  const handleSubmit: SubmitHandler<DailySchema> = (data, event) => {
    event?.preventDefault()

    mutation.mutate(data)

    if (mutation.isError) return mutation.error.message
  }

  return {
    methods,
    handleSubmit: methods.handleSubmit(handleSubmit),
  }
}

export default useDailyForm
