'use client'

import { useLocalStorage } from '@/Hooks/useLocalStorage'
import { BOARDS } from '@/mocks/BOARDS'
import {
  Board,
  BoardId,
  Card,
  CardId,
  List,
  ListId,
  PartialWithId,
} from '@/types/app'
import { genUUID } from '@/utils/genUUID'
import { createContext, useEffect, useState } from 'react'

interface BoardContext {
  board: Board
  addList: (title: string) => void
  removeList: (id: ListId) => void
  updateList: (newList: PartialWithId<List>) => void
  updateListsOrder: (newListsOrder: ListId[]) => void
  addCard: (listId: ListId, title: string) => void
  removeCard: (listId: ListId, cardId: CardId) => void
  updateCard: (listId: ListId, card: PartialWithId<Card>) => void
  updateCardsOrder: (listId: ListId, newCardsOrder: CardId[]) => void
  updateBoard: (updateBoard: PartialWithId<Board>) => void
}

const DEFAULT_BOARD: Board = {
  id: 'Board-',
  title: '',
  lists: {},
  listsOrder: [],
}

export const BoardContext = createContext<BoardContext | undefined>(undefined)

export const BoardContextProvider = ({
  id,
  children,
}: {
  id: BoardId
  children: React.ReactNode
}) => {
  const {
    state: board,
    getItem,
    saveItem: setBoard,
  } = useLocalStorage<Board>(id, DEFAULT_BOARD)

  useEffect(() => {
    // Fetch
    const getBoardFromAPI = (id: BoardId): Board | undefined => {
      return BOARDS.boards[id]
    }

    let newBoard = getBoardFromAPI(id)

    if (newBoard) {
      setBoard(newBoard)
      return
    }

    // If not found then search in local
    newBoard = getItem()

    if (newBoard) {
      setBoard(newBoard)
      return
    }

    // If not found then create a new board
    setBoard({ ...board, id, title: 'Board name' })
  }, [])

  // saveItem(BOARDS.boardsOrder.map((id) => BOARDS.boards[id]))

  const updateBoard = (updateBoard: PartialWithId<Board>) => {
    const newBoard = {
      ...board,
      ...updateBoard,
    }
    setBoard(newBoard)
  }

  const updateList = (newList: PartialWithId<List>) => {
    const newBoard = {
      ...board,
      lists: {
        ...board.lists,
        [newList.id]: {
          ...board.lists[newList.id],
          ...newList,
        },
      },
    }

    setBoard(newBoard)
  }

  const updateCard = (listId: ListId, card: PartialWithId<Card>) => {
    const newCard = {
      ...board.lists[listId].cards[card.id],
      ...card,
    }

    const newBoard = { ...board }

    newBoard.lists[listId].cards[card.id] = newCard

    setBoard(newBoard)
  }

  const updateListsOrder = (newListsOrder: ListId[]) => {
    const newBoard: Board = { ...board }

    newBoard.listsOrder = newListsOrder

    setBoard(newBoard)
  }

  const updateCardsOrder = (listId: ListId, newCardsOrder: CardId[]) => {
    const newBoard: Board = { ...board }

    newBoard.lists[listId].cardsOrder = newCardsOrder

    setBoard(newBoard)
  }

  const addList = (title: string) => {
    const newList: List = {
      id: `List-${genUUID()}`,
      title,
      cards: {},
      cardsOrder: [],
    }

    const newBoard = { ...board }

    newBoard.lists = {
      ...newBoard.lists,
      [newList.id]: newList,
    }

    newBoard.listsOrder.push(newList.id)

    setBoard(newBoard)
  }

  const removeList = (listId: ListId) => {
    const { [listId]: removedList, ...newLists } = board.lists

    const newBoard: Board = {
      ...board,
      lists: newLists,
      listsOrder: board.listsOrder.filter((id) => id !== listId),
    }

    setBoard(newBoard)
  }

  const addCard = (listId: ListId, title: string) => {
    const newCard: Card = {
      id: `Card-${genUUID()}`,
      title,
    }

    const newBoard: Board = {
      ...board,
    }

    newBoard.lists[listId].cards = {
      ...newBoard.lists[listId].cards,
      [newCard.id]: newCard,
    }

    newBoard.lists[listId].cardsOrder.push(newCard.id)

    setBoard(newBoard)
  }

  const removeCard = (listId: ListId, cardId: CardId) => {
    const { [cardId]: removedCard, ...newCards } = board.lists[listId].cards

    const newBoard: Board = {
      ...board,
    }

    newBoard.lists[listId].cards = newCards

    newBoard.lists[listId].cardsOrder = board.lists[listId].cardsOrder.filter(
      (id) => id !== cardId
    )

    setBoard(newBoard)
  }

  return (
    <BoardContext.Provider
      value={{
        board,
        addList,
        removeList,
        updateList,
        updateListsOrder,
        addCard,
        removeCard,
        updateCard,
        updateCardsOrder,
        updateBoard,
      }}>
      {children}
    </BoardContext.Provider>
  )
}
