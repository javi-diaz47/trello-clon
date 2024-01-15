'use client'

import { Board } from '@/components/Board'
import { List } from '@/components/List'
import { ButtonAddList } from '@/components/ButtonAddList'
import { useBoards } from '@/Hooks/useBoards'

export default function Home() {
  const { Boards } = useBoards()

  return (
    <main className="min-h-screen pl-8 bg-light-white text-text dark:bg-dark-gray dark:text-light-white ">
      <h2 className="text-4xl font-bold  ">Trello-Clon</h2>

      <Board>
        {Boards[0].lists.map((list) => (
          <List key={list.id} {...list} boardId={Boards[0].id} />
        ))}

        <ButtonAddList boardId={Boards[0].id} />
      </Board>
    </main>
  )
}
