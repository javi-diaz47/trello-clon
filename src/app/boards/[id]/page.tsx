import { BoardContextProvider } from '@/Context/BoardContext'
import Board from '@/components/Board'
import { BoardId } from '@/types/app'
import { Suspense } from 'react'
import Loading from '../loading'
import { BOARDS } from '@/mocks/BOARDS'
import { DEFAULT_BOARD } from '@/utils/constant'

export default function Page({ params }: { params: { id: string } }) {
  if (!params.id.startsWith('Board-')) {
    return (
      <div>
        <h2>Thats not a valid Board Id</h2>
      </div>
    )
  }

  // fetch board
  const id = params.id as BoardId

  return (
    <BoardContextProvider id={id}>
      <Suspense fallback={<Loading />}>
        <Board />
      </Suspense>
    </BoardContextProvider>
  )
}
