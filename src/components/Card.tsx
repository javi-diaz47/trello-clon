import { type Card } from '@/types/app'

interface CardProps {
  card: Card
}

function Card({ card }: CardProps) {
  return (
    <li
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
