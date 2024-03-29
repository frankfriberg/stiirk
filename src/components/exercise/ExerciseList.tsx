import { Exercise } from '@prisma/client'
import Button from 'components/common/Button'
import { BookOpen, MessageCircle, Plus } from 'react-feather'

interface Props {
  filteredExercises: Exercise[]
  callback: (exercise: Exercise) => void
}

const ExerciseList = ({ filteredExercises, callback }: Props) => {
  const filtered = filteredExercises.map((exercise) => (
    <div className="flex items-center p-3 bg-white border-b" key={exercise.id}>
      <div className="grow">
        <h5>{exercise.name}</h5>
      </div>
      <Button
        icon={BookOpen}
        size="small"
        className="ml-3"
        callback={() => window.alert(exercise)}
      />
      <Button
        icon={Plus}
        style="black"
        size="small"
        className="ml-3"
        callback={() => callback(exercise)}
      />
    </div>
  ))

  const noneFound = (
    <div className="text-center">
      <h4>No exercises found, want to add one?</h4>
      <Button
        className="block mx-auto mt-5"
        icon={MessageCircle}
        label="Request Exercise"
        callback={() => window.alert('Add')}
      />
    </div>
  )

  return (
    <div className="bg-slate-100">
      {filteredExercises.length ? filtered : noneFound}
    </div>
  )
}

export default ExerciseList
