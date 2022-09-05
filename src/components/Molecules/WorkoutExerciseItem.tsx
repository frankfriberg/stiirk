import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { Button } from 'components/Atoms/Button'
import Icon from 'components/Atoms/Icon'
import React from 'react'
import { useFormContext } from 'react-hook-form'
import { Input } from 'components/Atoms/Input'
import { DailyExerciseSchema } from 'server/router/daily'

interface ItemProp {
  id: string
  data: DailyExerciseSchema
  callback: () => void
  prefix: string
}

const WorkoutExerciseItem = ({ id, data, callback, prefix }: ItemProp) => {
  const { register } = useFormContext()
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    setActivatorNodeRef,
  } = useSortable({
    id: id,
  })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      className="grid grid-cols-10 gap-2 px-4 py-2 bg-white border-t border-x first:rounded-t-md last:rounded-b-md last:border-b only:rounded-md only:border"
    >
      <span className="col-span-5 text-neutral-500">{data.exercise.name}</span>
      <Input
        className="col-span-1"
        type="number"
        label="Exercise Min Reps"
        {...register(`${prefix}.min`, { valueAsNumber: true })}
      />
      <Input
        className="col-span-1"
        type="number"
        label="Exercise Max Reps"
        {...register(`${prefix}.max`, { valueAsNumber: true })}
      />
      <Input
        className="col-span-1 place-self-center"
        type="checkbox"
        label="Exercise Split"
        {...register(`${prefix}.leftright`)}
      />
      <Button
        icon="trash"
        size="small"
        style="red"
        className="col-auto place-self-center"
        callback={callback}
      />
      <Icon
        icon="menu"
        className="place-self-center"
        ref={setActivatorNodeRef}
        {...listeners}
      />
    </div>
  )
}

export default WorkoutExerciseItem
