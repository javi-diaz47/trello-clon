'use client'

import { BOARDS } from '@/mocks/BOARDS'
import { Board } from '@/types/app'
import {
  AddCardParams,
  AddListParams,
  RemoveCardParams,
  RemoveListParams,
} from '@/types/boardContext'
import { genUUID } from '@/utils/genUUID'
import { createContext, useState } from 'react'

interface BoardContext {
  Boards: Board[]
  addList: (data: AddListParams) => void
  removeList: (data: RemoveListParams) => void
  addCard: (data: AddCardParams) => void
  removeCard: (data: RemoveCardParams) => void
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

  const removeList = ({ boardId, listId }: RemoveListParams) => {
    const boardIndex = Boards.findIndex((board) => board.id === boardId)

    const newBoards = [...Boards]

    newBoards[boardIndex].lists = newBoards[boardIndex].lists.filter(
      (list) => list.id !== listId
    )

    setBoard(newBoards)
  }

  const addCard = ({ boardId, listId, cardTitle }: AddCardParams) => {
    const boardIndex = Boards.findIndex((board) => board.id === boardId)
    const listIndex = Boards[boardIndex].lists.findIndex(
      (list) => list.id === listId
    )

    const newBoards = [...Boards]

    newBoards[boardIndex].lists[listIndex].cards.push({
      id: genUUID(),
      title: cardTitle,
    })

    console.log('first')

    setBoard(newBoards)
  }

  const removeCard = ({ boardId, listId }: RemoveListParams) => {
    const boardIndex = Boards.findIndex((board) => board.id === boardId)
    const listIndex = Boards[boardIndex].lists.findIndex(
      (list) => list.id === listId
    )

    const newBoards = [...Boards]

    newBoards[boardIndex].lists[listIndex].cards = newBoards[boardIndex].lists[
      listIndex
    ].cards.filter((list) => list.id !== listId)

    setBoard(newBoards)
  }

  return (
    <BoardContext.Provider
      value={{
        Boards,
        addList,
        removeList,
        addCard,
        removeCard,
      }}>
      {children}
    </BoardContext.Provider>
  )
}
