import { BoardContextProvider } from '@/Context/BoardContext'
import Board from '@/components/Board'
import { Suspense } from 'react'
import Loading from '../loading'
import { getBoardByIdFromAPI } from '@/api/boards'
import { UUID } from 'crypto'

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id as UUID

  const board = getBoardByIdFromAPI(id)

  return (
    <Suspense fallback={<Loading />}>
      <BoardContextProvider board={board}>
        <Board />
      </BoardContextProvider>
    </Suspense>
  )
}
