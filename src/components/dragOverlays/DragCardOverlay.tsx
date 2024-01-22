import { useSortableProvider } from '@/Hooks/useSortableProvider'
import { type Card } from '@/types/app'

interface CardProps {
  card: Card
}

function DragCardOverlay({ card }: CardProps) {
  const { attributes, listeners, setNodeRef, style } = useSortableProvider(
    card.id,
    'card',
    'listitem',
    card
  )

  return (
    <li
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="h-fit w-full p-4 flex flex-col gap-2 bg-gray-300 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border-2  border-neutral-700">
      <h2 className="text-xl font-bold">{card.title}</h2>
      <p>{card.def}</p>
    </li>
  )
}

export { DragCardOverlay }
