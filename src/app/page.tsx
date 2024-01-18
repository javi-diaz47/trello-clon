'use client'

import { Board } from '@/components/Board'
import { List } from '@/components/List'
import { ButtonAddList } from '@/components/ButtonAddList'
import { useBoards } from '@/Hooks/useBoards'

export default function Home() {
  return (
    <main className="min-h-screen pl-8 bg-light-white text-text dark:bg-dark-gray dark:text-light-white ">
      <div>
        <h2 className="text-4xl font-bold  ">Trello-Clon</h2>
        {/* <ButtonAddList /> */}
      </div>

      <Board />
    </main>
  )
}
