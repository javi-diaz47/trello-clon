'use client'
import { createNewBoardFromAPI } from '@/api/boards'
import { Button } from '@/components/ui/button'
import { BOARDS } from '@/mocks/BOARDS'
import { genUUID } from '@/utils/genUUID'
import { UUID } from 'crypto'
import Link from 'next/link'

export default function Home() {
  const newBoardId = genUUID() as UUID
  return (
    <section className="w-full h-[calc(100vh-10rem)] p-8 grid gap-8 bg-light-gray rounded-3xl mr-16">
      <div className="flex flex-col gap-8">
        <h2 className="font-bold text-4xl">My Boards</h2>
        <section className="flex gap-4">
          {BOARDS.boardsOrder.map((id) => (
            <Button key={id} variant={'secondary'} className="text-md">
              <Link href={`boards/${id}`}>{id}</Link>
            </Button>
          ))}
          <Button
            variant={'default'}
            size={'lg'}
            className="text-md"
            onClick={() => createNewBoardFromAPI(newBoardId)}>
            <Link href={`boards/Board-${newBoardId}`}>Create new Board</Link>
          </Button>
        </section>
      </div>
    </section>
  )
}
