'use client'

import { BOARDS } from '@/mocks/BOARDS'
import { Board } from '@/types/app'
import { genUUID } from '@/utils/genUUID'
import { createContext, useState } from 'react'

interface AddListParams {
  boardId: string
  listName: string
}

interface BoardContext {
  Boards: Board[]
  addList: ({ boardId, listName }: AddListParams) => void
}

export const BoardContext = createContext<BoardContext | undefined>(undefined)

export const BoardContextProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [Boards, setBoard] = useState<Board[]>(BOARDS)

  const addList = ({ boardId, listName }: AddListParams) => {
    const boardIndex = Boards.findIndex((board) => board.id === boardId)

    const newBoards = [...Boards]

    newBoards[boardIndex].lists.push({
      id: genUUID(),
      name: listName,
      cards: [],
    })

    setBoard(newBoards)
  }

  return (
    <BoardContext.Provider
      value={{
        Boards,
        addList,
      }}>
      {children}
    </BoardContext.Provider>
  )
}
