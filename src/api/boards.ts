import { BOARDS } from '@/mocks/BOARDS'
import { Board } from '@/types/app'
import { UUID } from 'crypto'

export const getBoardByIdFromAPI = (id: UUID) => {
  const board: Board | undefined = BOARDS.boards[id]

  return board
}

export const createNewBoardFromAPI = (id: UUID) => {
  console.log('created')
}
