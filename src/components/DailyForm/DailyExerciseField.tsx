import ExerciseContext from 'components/ExerciseContext'
import ExerciseModal from 'components/ExerciseModal/ExerciseModal'
import useModal from 'components/ExerciseModal/useExerciseModal'
import { Input } from 'components/Form/Input'
import { useContext } from 'react'
import { Exercise } from 'types/exercise.types'
import useDailyExerciseField from './useDailyExerciseField'

interface Props {
  prefix: number
}

const DailyExerciseField = ({ prefix }: Props) => {
  const { fields, addNewExercise, removeExercise } =
    useDailyExerciseField(prefix)
  const { isShown, toggle } = useModal()

  const addSelectedExercise = (exercise: Exercise) => addNewExercise(exercise)

  return (
    <div>
      <h3>Exercises</h3>
      <button type="button" onClick={toggle}>
        + Add Exercise
      </button>
      <ExerciseModal
        callback={addSelectedExercise}
        isShown={isShown}
        hide={toggle}
      />
      {fields.map((field, index) => (
        <div key={field.id} className="my-3 bg-slate-200">
          <div>
            <p>{field.exercise.title}</p>
          </div>
          <div>
            <Input
              name={`workouts.${prefix}.exercises.${index}.max`}
              label="Max"
            />
            <Input
              name={`workouts.${prefix}.exercises.${index}.min`}
              label="Min"
            />
          </div>
          <button type="button" onClick={removeExercise(index)}>
            - Remove
          </button>
        </div>
      ))}
    </div>
  )
}

export default DailyExerciseField
