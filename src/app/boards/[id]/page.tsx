import { BoardContextProvider } from '@/Context/BoardContext'
import Board from '@/components/Board'
import { BoardId } from '@/types/app'
import { Suspense } from 'react'
import Loading from '../loading'

export default function Page({ params }: { params: { id: string } }) {
  if (!params.id.startsWith('Board-')) {
    return (
      <div>
        <h2>Thats not a valid Board Id</h2>
      </div>
    )
  }

  return (
    <Suspense fallback={<Loading />}>
      <BoardContextProvider id={params.id as BoardId}>
        <Board />
      </BoardContextProvider>
    </Suspense>
  )
}
