import { BoardContext } from '@/Context/BoardContext'
import { useContext } from 'react'

function useBoards() {
  const context = useContext(BoardContext)

  if (!context) {
    throw new Error('useBoards must be inside the BoardContextProvider')
  }

  return context
}

export { useBoards }
