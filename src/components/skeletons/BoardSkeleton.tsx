'use client'

import { ListSkeleton } from './ListSkeleton'

function BoardSkeleton() {
  return (
    <>
      <button>Add list</button>
      <div>
        <div>
          <section className="h-full relative min-h-screen rounded-2xl p-12 bg-dark-white  dark:bg-light-gray flex gap-12">
            {Array(2)
              .fill(0)
              .map((_, i) => (
                <ListSkeleton key={i} />
              ))}
          </section>
        </div>
      </div>
    </>
  )
}
export { BoardSkeleton }
