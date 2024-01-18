import { type Card } from '@/types/app'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { ElementRef, useRef } from 'react'

interface CardProps {
  card: Card
}

function Card({ card }: CardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: card.id, data: { type: 'card', card } })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  const height = useRef<ElementRef<'div'>>(null)

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={{
          ...style,
          height: `${height?.current?.clientHeight} px`,
        }}
        className=" border-2 rounded-3xl border-sky-400 w-full h-24 max-w-xs opacity-40"
      />
    )
  }

  return (
    <li
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className=" w-full h-fit p-4 flex flex-col gap-2 bg-gray-300 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border-2  border-neutral-700">
      <div ref={height}>
        <h2 className="text-xl font-bold">{card.title}</h2>
        <p>{card.def}</p>
      </div>
    </li>
  )
}

export { Card }
