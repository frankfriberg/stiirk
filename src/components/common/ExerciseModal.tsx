import { Exercise } from '@prisma/client'
import ExerciseList from 'components/exercise/ExerciseList'
import React, { FunctionComponent, useContext, useState } from 'react'
import ExerciseContext from 'context/exerciseContext'
import Button from 'components/common/Button'
import { X } from 'react-feather'

interface ModalProps {
  isShown: boolean
  hide: () => void
  callback: (exercise: Exercise) => void
}

const ExerciseModal: FunctionComponent<ModalProps> = ({
  isShown,
  hide,
  callback,
}) => {
  const [search, setSearch] = useState('')
  const exercises = useContext(ExerciseContext)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
  }

  const filteredExercises = exercises.filter((exercise) => {
    return exercise.name.toLowerCase().includes(search.toLowerCase())
  })

  const modal = (
    <div className="fixed top-0 left-0 w-full h-screen overflow-auto overscroll-contain bg-slate-100">
      <div className="sticky top-0">
        <div className="flex items-center justify-between w-full px-3 py-2 border-b bg-slate-100">
          <h3 className="mt-3">Add Exercise</h3>
          <Button icon={X} size="small" callback={hide} />
        </div>
        <input
          className="w-full p-3 border outline-none border-neutral-500 focus:ring-1 focus:border-black ring-black"
          type="search"
          placeholder="Search Exercises"
          onChange={handleChange}
        />
      </div>
      <ExerciseList filteredExercises={filteredExercises} callback={callback} />
    </div>
  )

  return isShown ? modal : null
}

export default ExerciseModal
