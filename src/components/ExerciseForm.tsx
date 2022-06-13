import { createNewExercise } from 'modules/exercise/exercise.controller'
import { useRouter } from 'next/router'
import React from 'react'
import { useForm, SubmitHandler, SubmitErrorHandler } from 'react-hook-form'

type Inputs = {
  title: string
  slug: string
  force: string
}

export default function ExerciseForm() {
  const router = useRouter()
  const { register, handleSubmit, formState } = useForm<Inputs>()
  const { isSubmitting } = formState

  const onSubmit: SubmitHandler<Inputs> = (data, event) => {
    event?.preventDefault()
    fetch('/api/exercise/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((exercise) => router.push(`/exercises/${data.slug}`))
      .catch((error) => console.error(error))
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
        Create Exercise
      </button>
    </form>
  )
}
