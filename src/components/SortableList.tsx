import {
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
  TouchSensor,
  DragEndEvent,
  DragStartEvent,
} from '@dnd-kit/core'
import { ComponentType, ElementType, ReactNode, useMemo, useState } from 'react'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'

type ListProps<P extends object> = {
  items: any[]
  onEnd: (start: number, end: number) => void
  children?: ReactNode
  Child: ComponentType<P> | ElementType
} & P

const SortableList = <P extends object>({
  items,
  onEnd,
  children,
  Child,
}: ListProps<P>) => {
  const [activeId, setActiveId] = useState<string | number | null>(null)
  const itemIds = useMemo(() => items.map((item) => item.id), [items])
  const sensors = useSensors(useSensor(PointerSensor), useSensor(TouchSensor))

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event

    setActiveId(active.id)
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    if (!over) return

    if (active.id !== over.id) {
      const start = items.findIndex((item) => item.id == (active.id as string))
      const end = items.findIndex((item) => item.id == (over.id as string))
      onEnd(start, end)
    }

    setActiveId(null)
  }

  return (
    <div>
      <DndContext
        sensors={sensors}
        onDragEnd={handleDragEnd}
        onDragStart={handleDragStart}
      >
        <SortableContext items={itemIds} strategy={verticalListSortingStrategy}>
          {children}
        </SortableContext>
        {/* <DragOverlay>{activeId ? child : null}</DragOverlay> */}
      </DndContext>
    </div>
  )
}

export default SortableList
