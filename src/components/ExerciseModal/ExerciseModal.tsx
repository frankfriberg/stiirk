import ExerciseContext from 'components/ExerciseContext'
import React, { FunctionComponent, useContext, useState } from 'react'
import { Exercise } from 'types/exercise.types'
import ExerciseList from './ExerciseList'

interface ModalProps {
  isShown: boolean
  hide: () => void
  callback(exercise: Exercise): void
}

const ExerciseModal: FunctionComponent<ModalProps> = ({
  isShown,
  hide,
  callback,
}) => {
  const [search, setSearch] = useState('')
  const [selectedExercise, setExercise] = useState<Exercise>()
  const exercises = useContext(ExerciseContext)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
  }

  const filteredExercises = exercises.filter((exercise) => {
    return exercise.title.toLowerCase().includes(search.toLowerCase())
  })

  const modal = (
    <div className="modal">
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h4>Add Exercise</h4>
        <button type="button" onClick={hide}>
          Close Modal
        </button>
        <label>
          <p>Search</p>
          <input
            type="search"
            placeholder="Search Exercises"
            onChange={handleChange}
          />
        </label>
        <div style={{ overflowY: 'scroll' }}>
          <ExerciseList
            filteredExercises={filteredExercises}
            callback={callback}
          />
        </div>
      </div>
    </div>
  )

  return isShown ? modal : null
}

export default ExerciseModal
