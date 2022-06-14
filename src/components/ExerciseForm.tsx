import { useRouter } from 'next/router'
import { useForm, SubmitHandler, SubmitErrorHandler } from 'react-hook-form'
import { IExercise } from 'types/exercise.types'

type Inputs = {
  title: string
  slug: string
  force: string
}

type Props = {
  put?: boolean
  exerciseFill?: IExercise
}

function ExerciseForm({ put, exerciseFill }: Props) {
  const router = useRouter()
  const { register, handleSubmit, formState } = useForm<Inputs>({
    defaultValues: exerciseFill,
  })
  const { isSubmitting } = formState

  const onSubmit: SubmitHandler<Inputs> = (data, event) => {
    event?.preventDefault()
    const url = put ? `/api/exercise/${exerciseFill!.id}` : '/api/exercise/'
    const method = put ? 'PUT' : 'POST'

    fetch(url, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(async (response) => {
        const data = await response.json()

        if (!response.ok) {
          const error = (data && data.message) || response.statusText
          return Promise.reject(error)
        }

        router.push(`/exercises/${data.slug}`)
      })
      .catch((error) => {
        console.error('There was an error!', error)
      })
  }

  const onError: SubmitErrorHandler<Inputs> = (errors, e) => {
    console.log(errors)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit, onError)}>
      <label htmlFor="title">
        <p>Title</p>
        <input type="text" {...register('title')} />
      </label>
      <label htmlFor="title">
        <p>Slug</p>
        <input type="text" {...register('slug')} />
      </label>
      <fieldset>
        <legend>Force</legend>

        <label htmlFor="push">
          <input type="radio" value="push" id="push" {...register('force')} />
          <span>Push</span>
        </label>
        <label htmlFor="pull">
          <input type="radio" value="pull" id="pull" {...register('force')} />
          <span>Pull</span>
        </label>
      </fieldset>

      <button disabled={isSubmitting}>
        {isSubmitting && <span>Creating exercise...</span>}
        Send Request
      </button>
    </form>
  )
}

ExerciseForm.defaultProps = {}

export default ExerciseForm
