import { useFieldArray, useFormContext } from 'react-hook-form'
import { Daily } from 'types/daily.types'
import { Exercise } from 'types/exercise.types'

const useDailyExerciseField = (prefix: number) => {
  const { register, control, getValues } = useFormContext<Daily>()

  const { fields, append, remove, move } = useFieldArray({
    control,
    name: `workouts.${prefix}.exercises`,
  })

  const addNewExercise = (exercise: Exercise, max: number) => {
    append({
      exercise: exercise,
      max: max,
      min: 10,
      leftright: false,
    })
  }

  const removeExercise = (exerciseIndex: number) => () => {
    remove(exerciseIndex)
  }

  const moveExercise = (start: number, end: number) => {
    move(start, end)
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
