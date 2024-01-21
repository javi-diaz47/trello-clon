import { CardSkeleton } from './CardSkeleton'

function ListSkeleton() {
  return (
    <div className="relative animate-pulse border rounded-3xl border-neutral-700 w-full h-screen max-w-xs  ">
      <header className="w-full px-6 py-4 flex justify-between border border-t-0 border-gray-600 border-x-0">
        <div className="w-full flex items-center gap-2 mr-4">
          <div className=" w-3 aspect-square bg-light-white rounded-full"></div>
          <div className=" w-full h-6 rounded-lg bg-gray-700"></div>
        </div>
        <div className="flex gap-2 ">
          <div
            className=" w-6 h-6 aspect-square rounded-full bg-gray-600"
            aria-label="toggle menu"></div>
          <div
            className=" w-6 h-6 aspect-square rounded-full bg-gray-600"
            aria-label="add new card"></div>
        </div>
      </header>

      <section>
        <ul className=" px-4 py-4 h-full flex flex-col gap-4">
          {Array(5)
            .fill(0)
            .map((_, i) => (
              <CardSkeleton key={i} />
            ))}
          <li>
            <div className="w-full h-6 bg-gray-600 rounded-lg"></div>
          </li>
        </ul>
      </section>
    </div>
  )
}

export { ListSkeleton }
