import { BoardContextProvider } from '@/Context/BoardContext'
import Board from '@/components/Board'
import { BoardId } from '@/types/app'
import { Suspense } from 'react'
import Loading from '../loading'
import BoardWrapper from '@/components/BoardWrapper'

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

  return (
    <Suspense fallback={<Loading />}>
      <BoardWrapper
        id={id}
        render={(board) => (
          <BoardContextProvider board={board}>
            <Board />
          </BoardContextProvider>
        )}
      />
    </Suspense>
  )
}
