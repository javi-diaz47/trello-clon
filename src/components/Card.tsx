import { useSortableProvider } from '@/Hooks/useSortableProvider'
import { type Card } from '@/types/app'

interface CardProps {
  card: Card
}

function Card({ card }: CardProps) {
  // const { attributes, isDragging, listeners, setNodeRef, style } =
  //   useSortableProvider(card.id, 'card', 'listitem', card)

  // if (isDragging) {
  //   return (
  //     <div
  //       ref={setNodeRef}
  //       style={style}
  //       className="border-2 rounded-3xl border-sky-400 w-full h-fit min-h-24 max-w-xs opacity-40"
  //     />
  //   )
  // }

  return (
    <li
      // ref={setNodeRef}
      // style={style}
      // {...attributes}
      // {...listeners}
      className={`${false ? 'min-h-24 overflow-hidden' : 'h-fit'} 
      w-full  p-4 grid gap-2 bg-gray-300 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border-2  border-neutral-700 `}>
      <div className="h-full">
        <h2 className="text-xl font-bold">{card.title}</h2>
        <p>{card.def}</p>
      </div>
    </li>
  )
}

export { Card }
