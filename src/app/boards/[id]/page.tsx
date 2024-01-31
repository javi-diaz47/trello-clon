import { BoardContextProvider } from '@/Context/BoardContext'
import Board from '@/components/Board'
import { Board as TBoard, BoardId } from '@/types/app'
import { Suspense } from 'react'
import Loading from '../loading'
import { BOARDS } from '@/mocks/BOARDS'
import { DEFAULT_BOARD } from '@/utils/constant'
import { getBoardByIdFromAPI } from '@/api/boards'

export default function Page({ params }: { params: { id: string } }) {
  if (!params.id.startsWith('Board-')) {
    return (
      <div>
        <h2>Thats not a valid Board Id</h2>
      </div>
    )
  }

  // fetch board in the db
  const id = params.id as BoardId

  const board = getBoardByIdFromAPI(id)

  if (!board) {
    return <div>Sorry Board Not Found</div>
  }

  return (
    <BoardContextProvider board={board}>
      <Suspense fallback={<Loading />}>
        <Board />
      </Suspense>
    </BoardContextProvider>
  )
}
