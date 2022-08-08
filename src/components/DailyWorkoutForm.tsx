import { HydratedDocument } from 'mongoose'
import { useRouter } from 'next/router'
import { SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form'
import { Daily, DailyWorkout } from 'types/daily.types'
import { Exercise } from 'types/exercise.types'
import Select from 'react-select'
import React, { useState } from 'react'

type Props = {
  method: 'POST' | 'PUT'
  exercises: Array<HydratedDocument<Exercise>>
  dailyWorkoutFill?: HydratedDocument<DailyWorkout>
}

const DailyWorkoutForm = ({ method, dailyWorkoutFill, exercises }: Props) => {
  const router = useRouter()
  const [search, setSearch] = useState('')
  const { register, handleSubmit, formState } = useForm<DailyWorkout>()

  const { isSubmitting, errors } = formState

  const searchExercise: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ): void => {
    setSearch(event.currentTarget.value)
  }

  const filteredExercises = !search
    ? exercises
    : exercises.filter((exercise) => {
        return exercise.title.toLowerCase().includes(search.toLowerCase())
      })

  const onSubmit: SubmitHandler<DailyWorkout> = (data, event) => {
    event?.preventDefault()
    const url =
      method == 'PUT' ? `api/daily/${dailyWorkoutFill?.id}` : 'api/daily'
    const redirect = `/daily/${data}`

    fetch(url, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(async (response) => {
        const data: HydratedDocument<Daily> = await response.json()

        if (!response.ok) {
          throw data
        }

        if (method == 'PUT') {
          return router.push(`/daily/${data.id}`)
        }

        return data
      })
      .catch((error) => {
        console.error(error)
      })
  }
  const options = exercises.map((exercise) => {
    return { value: exercise.id, label: exercise.title }
  })

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>
          Title
          <input type="text" {...register('title')} />
        </label>
        <label>
          Search
          <input type="text" onChange={searchExercise} />
        </label>
        {filteredExercises.map((exercise) => {
          return <p key={exercise.id}>{exercise.title}</p>
        })}
        <button className="p-3 bg-blue-400" type="button">
          Add Exercise
        </button>
      </form>
    </>
  )
}

export default DailyWorkoutForm
