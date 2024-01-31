import { BOARDS } from '@/mocks/BOARDS'
import { Board, BoardId } from '@/types/app'

export const getBoardByIdFromAPI = (id: BoardId) => {
  const board: Board | undefined = BOARDS.boards[id]

  return board
}

export const createNewBoardFromAPI = (id: BoardId) => {
  console.log('created')
}
