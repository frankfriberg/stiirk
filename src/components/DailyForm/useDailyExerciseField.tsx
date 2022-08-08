import { useFieldArray, useFormContext } from 'react-hook-form'
import { Daily } from 'types/daily.types'
import { Exercise } from 'types/exercise.types'

const useDailyExerciseField = (prefix: number) => {
  const { register, control } = useFormContext<Daily>()

  const exerciseArrayInputPath = `${prefix}.exercises` as 'exercises'

  const { fields, append, remove } = useFieldArray({
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

  return {
    fields,
    register,
    addNewExercise,
    removeExercise,
  }
}

export default useDailyExerciseField
