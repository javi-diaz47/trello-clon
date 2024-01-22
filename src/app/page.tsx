'use client'

import { BoardSkeleton } from '@/components/skeletons/BoardSkeleton'
import dynamic from 'next/dynamic'

const DynamicBoard = dynamic(() => import('@/components/Board'), {
  loading: () => <BoardSkeleton />,
})

export default function Home() {
  return (
    <main className="grid grid-cols-[6rem_1fr] w-full h-full min-h-screen  bg-light-white text-text dark:bg-dark-gray dark:text-light-white ">
      <nav className=" w-full  "></nav>
      <DynamicBoard />
    </main>
  )
}
