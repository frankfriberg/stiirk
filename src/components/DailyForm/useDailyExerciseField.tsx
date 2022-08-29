import { useFieldArray, useFormContext } from 'react-hook-form'
import { Daily } from 'types/daily.types'
import { Exercise } from 'types/exercise.types'

const useDailyExerciseField = (prefix: number) => {
  const { register, control } = useFormContext<Daily>()

  const { fields, append, remove, move } = useFieldArray({
    control,
    name: `workouts.${prefix}.exercises`,
  })

  const addNewExercise = (exercise: Exercise) => {
    append({
      exercise: exercise,
      max: 30,
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
    addNewExercise,
    removeExercise,
    moveExercise,
  }
}

export default useDailyExerciseField
