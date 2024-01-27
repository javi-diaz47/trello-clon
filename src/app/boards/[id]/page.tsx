import { BoardContextProvider } from '@/Context/BoardContext'
import { BoardSkeleton } from '@/components/skeletons/BoardSkeleton'
import { BoardId } from '@/types/app'
import dynamic from 'next/dynamic'

const DynamicBoard = dynamic(() => import('@/components/Board'), {
  loading: () => <BoardSkeleton />,
})

export default function Page({ params }: { params: { id: string } }) {
  if (!params.id.startsWith('Board-')) {
    return (
      <div>
        <h2>Thats not a valid Board Id</h2>
      </div>
    )
  }

  return (
    <BoardContextProvider id={params.id as BoardId}>
      <DynamicBoard />
    </BoardContextProvider>
  )
}
