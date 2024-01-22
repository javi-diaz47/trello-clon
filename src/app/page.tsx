'use client'

import { BoardSkeleton } from '@/components/skeletons/BoardSkeleton'
import dynamic from 'next/dynamic'

const DynamicBoard = dynamic(() => import('@/components/Board'), {
  loading: () => <BoardSkeleton />,
})

export default function Home() {
  return (
    <main className="min-h-screen pl-8 bg-light-white text-text dark:bg-dark-gray dark:text-light-white ">
      <div>
        <h2 className="text-4xl font-bold  ">Trello-Clon</h2>
        {/* <ButtonAddList /> */}
      </div>
      <DynamicBoard />
    </main>
  )
}
