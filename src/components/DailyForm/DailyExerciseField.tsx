import { Button } from 'components/Atoms/Button'
import ExerciseModal from 'components/ExerciseModal/ExerciseModal'
import useModal from 'components/ExerciseModal/useExerciseModal'
import useDailyExerciseField from './useDailyExerciseField'
import WorkoutExerciseItem from 'components/Molecules/WorkoutExerciseItem'
import { useMemo, useState } from 'react'
import {
  DndContext,
  DragEndEvent,
  DragStartEvent,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { Exercise } from '@prisma/client'

interface Props {
  prefix: number
}

const DailyExerciseField = ({ prefix }: Props) => {
  const { fields, getValues, addNewExercise, removeExercise, moveExercise } =
    useDailyExerciseField(prefix)
  const { modalIsShown, toggleModal } = useModal()
  const [activeId, setActiveId] = useState<string | number | null>(null)
  const fieldIds = useMemo(() => fields.map((field) => field.id), [fields])
  const sensors = useSensors(useSensor(PointerSensor), useSensor(TouchSensor))

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event

    setActiveId(active.id)
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    if (!over) return

    if (active.id !== over.id) {
      const start = fields.findIndex(
        (field) => field.id == (active.id as string)
      )
      const end = fields.findIndex((field) => field.id == (over.id as string))
      moveExercise(start, end)
    }

    setActiveId(null)
  }

  const addSelectedExercise = (exercise: Exercise) => {
    const dailyExercise = {
      max: getValues('maxReps'),
      min: 10,
      split: false,
      exercise: exercise,
    }
    return addNewExercise(dailyExercise)
  }

  return (
    <div>
      <h4 className="ml-4">Exercises</h4>
      <div className="grid grid-cols-10 gap-2 mx-4 mt-4 text-sm text-neutral-500">
        <label className="col-span-5">Name</label>
        <label className="col-span-1">Min</label>
        <label className="col-span-1">Max</label>
        <label className="col-span-1">Split</label>
      </div>

      <div>
        <DndContext
          sensors={sensors}
          onDragEnd={handleDragEnd}
          onDragStart={handleDragStart}
        >
          <SortableContext
            items={fieldIds}
            strategy={verticalListSortingStrategy}
          >
            {fields.map((field, index) => (
              <WorkoutExerciseItem
                key={field.id}
                id={field.id}
                data={field}
                callback={removeExercise(index)}
                prefix={`workouts.${prefix}.exercises.${index}`}
              />
            ))}
          </SortableContext>
        </DndContext>
      </div>

      <Button
        callback={toggleModal}
        className="block mx-auto mt-4"
        label="Add Exercise"
        icon="plus-circle"
      />
      <ExerciseModal
        callback={addSelectedExercise}
        isShown={modalIsShown}
        hide={toggleModal}
      />
    </div>
  )
}

export default DailyExerciseField
