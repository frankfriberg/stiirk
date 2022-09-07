import { DailyExerciseSchema, DailySchema } from 'lib/validation/daily'
import { useFieldArray, useFormContext } from 'react-hook-form'

const useDailyExerciseField = (prefix: number) => {
  const { register, control, getValues } = useFormContext<DailySchema>()

  const { fields, append, remove, move } = useFieldArray({
    control,
    name: `workouts.${prefix}.exercises`,
  })

  const addNewExercise = (exercise: DailyExerciseSchema) => {
    return append(exercise)
  }

  const removeExercise = (exerciseIndex: number) => () => {
    return remove(exerciseIndex)
  }

  const moveExercise = (start: number, end: number) => {
    return move(start, end)
  }

  return {
    fields,
    register,
    getValues,
    addNewExercise,
    removeExercise,
    moveExercise,
  }
}

export default useDailyExerciseField
