import { HydratedDocument } from 'mongoose'
import { Exercise } from 'types/exercise.types'

interface Props {
  filteredExercises: HydratedDocument<Exercise>[]
  callback(exercise: Exercise): void
}

const ExerciseList = ({ filteredExercises, callback }: Props) => {
  const filtered = filteredExercises.map((exercise) => (
    <div key={exercise.id}>
      <h5>{exercise.title}</h5>
      <button type="button" onClick={(e) => callback(exercise)}>
        +
      </button>
    </div>
  ))
  return <div>{filtered}</div>
}

export default ExerciseList
