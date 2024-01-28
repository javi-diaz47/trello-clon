import { BOARDS } from '@/mocks/BOARDS'
import { genUUID } from '@/utils/genUUID'
import Link from 'next/link'

export default function Home() {
  return (
    <section className="w-full h-[calc(100vh-10rem)] p-8 grid gap-8 bg-light-gray rounded-3xl mr-16">
      <div className="flex flex-col gap-8">
        <h2 className="font-bold text-4xl">My Boards</h2>
        <section className="flex gap-4">
          {BOARDS.boardsOrder.map((id) => (
            <div
              key={id}
              className="w-32 h-12 bg-neutral-950 rounded-lg text-lg flex items-center p-2">
              <Link href={`boards/${id}`}>{id}</Link>
            </div>
          ))}
          <div className="min-w-32 bg-neutral-900 rounded-lg text-lg flex items-center p-2">
            <Link href={`boards/Board-${genUUID()}`}>Create new Board</Link>
          </div>
        </section>
      </div>
    </section>
  )
}
