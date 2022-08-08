import { useFieldArray, useFormContext } from 'react-hook-form'
import { Daily, DailyWorkout } from 'types/daily.types'

const useDailyWorkout = () => {
  const { register } = useFormContext()

  const { fields, append, remove } = useFieldArray<Daily>({
    name: 'workouts',
  })

  const addNewWorkout = () => {
    const defaultWorkout: DailyWorkout = {
      title: 'New Workout',
      exercises: [],
    }
    append(defaultWorkout)
  }

  const removeWorkout = (workoutIndex: number) => () => {
    remove(workoutIndex)
  }

  return {
    fields,
    register,
    addNewWorkout,
    removeWorkout,
  }
}

export default useDailyWorkout
