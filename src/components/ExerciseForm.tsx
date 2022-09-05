import { FormRequestHandler } from 'lib/SubmitHandler'
import { HydratedDocument } from 'mongoose'
import { useRouter } from 'next/router'
import { useForm, SubmitHandler, SubmitErrorHandler } from 'react-hook-form'
import { Exercise } from 'types/exercise.types'

type Props = {
  method: 'POST' | 'PUT'
  exerciseFill?: HydratedDocument<Exercise>
}

function ExerciseForm({ method, exerciseFill }: Props) {
  const router = useRouter()
  const { register, handleSubmit, formState } = useForm<Exercise>({
    defaultValues: exerciseFill,
  })
  const { isSubmitting } = formState

  const onSubmit: SubmitHandler<Exercise> = (data, event) => {
    event?.preventDefault()
    const url =
      method == 'PUT' ? `/api/exercise/${exerciseFill!.id}` : '/api/exercise/'
    const redirect = `/exercises/${data.slug}`

    return FormRequestHandler(data, url, method, redirect).catch((error) =>
      console.error(error)
    )
  }

  const onError: SubmitErrorHandler<Exercise> = (errors, e) => {
    console.log(errors)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit, onError)}>
      <label htmlFor="title">
        <p>Title</p>
        <input type="text" {...register('title')} />
      </label>
      <label htmlFor="slug">
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
