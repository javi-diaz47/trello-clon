import { getBoardByIdFromAPI } from '@/api/boards'
import { Board, BoardId } from '@/types/app'

interface BoardWrapper {
  id: BoardId
  render: (board: Board) => React.ReactNode
}

function BoardWrapper({ id, render }: BoardWrapper) {
  const board = getBoardByIdFromAPI(id)

  if (!board) {
    return <div>Sorry Board Not Found</div>
  }

  return <>{render(board)}</>
}

export default BoardWrapper
