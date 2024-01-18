'use client'

import { BOARDS } from '@/mocks/BOARDS'
import { Board, List } from '@/types/app'
import type { UniqueIdentifier } from '@/types/utils'
import { genUUID, getIndex } from '@/utils/genUUID'
import { createContext, useState } from 'react'

interface BoardContext {
  board: Board
  updateBoardLists: (lists: List[]) => void
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
        addList,
        removeList,
        addCard,
        removeCard,
      }}>
      {children}
    </BoardContext.Provider>
  )
}
