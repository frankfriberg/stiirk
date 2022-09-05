import { useFieldArray, useFormContext } from 'react-hook-form'
import { DailySchema, DailyWorkoutSchema } from 'server/router/daily'

const useDailyWorkout = () => {
  const { register, watch } = useFormContext()

  const { fields, append, remove } = useFieldArray<DailySchema>({
    name: 'workouts',
  })

  const addNewWorkout = () => {
    const defaultWorkout: DailyWorkoutSchema = {
      name: '',
      exercises: [],
    }
    append(defaultWorkout)
  }

  const removeWorkout = (workoutIndex: number) => () => {
    remove(workoutIndex)
  }

  return {
    watch,
    fields,
    register,
    addNewWorkout,
    removeWorkout,
  }
}

export default useDailyWorkout
