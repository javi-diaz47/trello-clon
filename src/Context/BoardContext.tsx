'use client'

import { BOARDS } from '@/mocks/BOARDS'
import { Board, List } from '@/types/app'
import type { UniqueIdentifier } from '@/types/utils'
import { genUUID } from '@/utils/genUUID'
import { getIndex } from '@/utils/getIndex'
import { createContext, useState } from 'react'

interface BoardContext {
  board: Board
  updateBoardLists: (lists: List[]) => void
  updateListById: (id: UniqueIdentifier, newList: List) => void
  addList: (listTitle: string) => void
  removeList: (id: UniqueIdentifier) => void
  addCard: (listId: UniqueIdentifier, title: string) => void
  removeCard: (listId: UniqueIdentifier, cardId: UniqueIdentifier) => void
}

export const BoardContext = createContext<BoardContext | undefined>(undefined)

export const BoardContextProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [board, setBoard] = useState<Board>(BOARDS[0])

  const updateListById = (id: UniqueIdentifier, newList: List) => {
    const listIndex = getIndex(board.lists, id)

    const newBoard = { ...board }

    newBoard.lists[listIndex] = newList

    setBoard(newBoard)
  }

  const updateBoardLists = (newLists: List[]) => {
    const newBoard = {
      ...board,
      lists: newLists,
    }

    setBoard(newBoard)
  }

  const addList = (listTitle: string) => {
    const newBoard = { ...board }

    newBoard.lists.push({
      id: genUUID(),
      title: listTitle,
      cards: [],
    })

    setBoard(newBoard)
  }

  const removeList = (listId: UniqueIdentifier) => {
    const newBoard = { ...board }

    newBoard.lists = newBoard.lists.filter((list) => list.id !== listId)

    setBoard(newBoard)
  }

  const addCard = (listId: UniqueIdentifier, cardTitle: string) => {
    const listIndex = getIndex(board.lists, listId)

    const newBoard = { ...board }

    newBoard.lists[listIndex].cards.push({
      id: genUUID(),
      title: cardTitle,
    })

    setBoard(newBoard)
  }

  const removeCard = (listId: UniqueIdentifier, cardId: UniqueIdentifier) => {
    const listIndex = getIndex(board.lists, listId)
    const newBoard = { ...board }

    newBoard.lists[listIndex].cards = newBoard.lists[listIndex].cards.filter(
      (card) => card.id !== cardId
    )

    setBoard(newBoard)
  }

  return (
    <BoardContext.Provider
      value={{
        board,
        updateBoardLists,
        updateListById,
        addList,
        removeList,
        addCard,
        removeCard,
      }}>
      {children}
    </BoardContext.Provider>
  )
}
