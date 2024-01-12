import { type Card } from '@/app/types/app'

function Card({ title, def, labels, activity }: Card) {
  return (
    <div className="h-full w-full p-4 flex flex-col gap-2 bg-gray-300 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border-2  border-neutral-700">
      <h2 className="text-xl font-bold">{title}</h2>
      <p>{def}</p>
    </div>
  )
}

export { Card }
