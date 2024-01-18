'use client'

import { BOARDS } from '@/mocks/BOARDS'
import { Board, List } from '@/types/app'
import type { UniqueIdentifier } from '@/types/utils'
import {
  AddCardParams,
  AddListParams,
  RemoveCardParams,
  RemoveListParams,
} from '@/types/boardContext'
import { genUUID, getIndex } from '@/utils/genUUID'
import { createContext, useState } from 'react'

interface BoardContext {
  boards: Board[]
  updateBoardLists: (id: UniqueIdentifier, lists: List[]) => void
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
  const [boards, setBoard] = useState<Board[]>(BOARDS)

  const updateBoardLists = (id: UniqueIdentifier, newLists: List[]) => {
    const newBoards = boards.map((board) => {
      if (board.id !== id) return board
      return {
        ...board,
        lists: newLists,
      }
    })

    setBoard(newBoards)
  }

  const addList = ({ boardId, listName }: AddListParams) => {
    const boardIndex = boards.findIndex((board) => board.id === boardId)

    const newBoards = [...boards]

    newBoards[boardIndex].lists.push({
      id: genUUID(),
      name: listName,
      cards: [],
    })

    setBoard(newBoards)
  }

  const removeList = ({ boardId, listId }: RemoveListParams) => {
    const boardIndex = boards.findIndex((board) => board.id === boardId)

    const newBoards = [...boards]

    newBoards[boardIndex].lists = newBoards[boardIndex].lists.filter(
      (list) => list.id !== listId
    )

    setBoard(newBoards)
  }

  const addCard = ({ boardId, listId, cardTitle }: AddCardParams) => {
    const boardIndex = boards.findIndex((board) => board.id === boardId)
    const listIndex = boards[boardIndex].lists.findIndex(
      (list) => list.id === listId
    )

    const newBoards = [...boards]

    newBoards[boardIndex].lists[listIndex].cards.push({
      id: genUUID(),
      title: cardTitle,
    })

    console.log(newBoards)

    setBoard(newBoards)
  }

  const removeCard = ({ boardId, listId }: RemoveListParams) => {
    const boardIndex = boards.findIndex((board) => board.id === boardId)
    const listIndex = boards[boardIndex].lists.findIndex(
      (list) => list.id === listId
    )

    const newBoards = [...boards]

    newBoards[boardIndex].lists[listIndex].cards = newBoards[boardIndex].lists[
      listIndex
    ].cards.filter((list) => list.id !== listId)

    setBoard(newBoards)
  }

  return (
    <BoardContext.Provider
      value={{
        boards,
        updateBoardLists,
        addList,
        removeList,
        addCard,
        removeCard,
      }}>
      {children}
    </BoardContext.Provider>
  )
}
