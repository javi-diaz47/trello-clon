export interface AddListParams {
  boardId: string
  listName: string
}

export interface RemoveListParams {
  boardId: string
  listId: string
}

export interface AddCardParams {
  boardId: string
  listId: string
  cardTitle: string
}

export interface RemoveCardParams {
  boardId: string
  listId: string
  cardId: string
}
