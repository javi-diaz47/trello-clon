'use client'
import { boardReducer } from '@/reducers/boardsReducer'
import { Board } from '@/types/app'
import { ActionBoard } from '@/types/reducers'
import { saveItem } from '@/utils/localStorage'
import { Dispatch, createContext, useEffect, useReducer } from 'react'

interface BoardContext {
  board: Board
  dispatcher: Dispatch<ActionBoard>
}

export const BoardContext = createContext<BoardContext | undefined>(undefined)

export const BoardContextProvider = ({
  board,
  children,
}: {
  board: Board
  children: React.ReactNode
}) => {
  const [state, dispatcher] = useReducer(boardReducer, board)

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
