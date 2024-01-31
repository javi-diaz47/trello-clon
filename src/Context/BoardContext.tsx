'use client'

import { BOARDS } from '@/mocks/BOARDS'
import { boardReducer } from '@/reducers/boardsReducer'
import { Board, BoardId } from '@/types/app'
import { ActionBoard } from '@/types/reducers'
import { DEFAULT_BOARD } from '@/utils/constant'
import { getItem, saveItem } from '@/utils/localStorage'
import { Dispatch, createContext, useEffect, useReducer } from 'react'

interface BoardContext {
  board: Board
  dispatcher: Dispatch<ActionBoard>
}

export const BoardContext = createContext<BoardContext | undefined>(undefined)

export const BoardContextProvider = ({
  id,
  children,
}: {
  id: BoardId
  children: React.ReactNode
}) => {
  const [state, dispatcher] = useReducer(boardReducer, DEFAULT_BOARD)

  console.log(state)

  useEffect(() => {
    let newBoard: Board | undefined = BOARDS.boards[id]

    if (newBoard) {
      dispatcher({
        type: 'update board',
        payload: {
          newBoard,
        },
      })
    }

    newBoard = getItem(id)
    if (newBoard) {
      dispatcher({
        type: 'update board',
        payload: {
          newBoard,
        },
      })
    }
  }, [])

  useEffect(() => {
    saveItem(state.id, state)
  }, [state])

  return (
    <BoardContext.Provider
      value={{
        board: state,
        dispatcher,
      }}>
      {children}
    </BoardContext.Provider>
  )
}
