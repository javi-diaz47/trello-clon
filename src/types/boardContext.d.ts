import { UniqueIdentifier } from '@dnd-kit/core'

// Lists
export interface AddListParams {
  boardId: UniqueIdentifier
  listName: string
}

export interface RemoveListParams {
  boardId: UniqueIdentifier
  listId: UniqueIdentifier
}

// Cards
export interface AddCardParams {
  boardId: UniqueIdentifier
  listId: UniqueIdentifier
  cardTitle: string
}

export interface RemoveCardParams {
  boardId: UniqueIdentifier
  listId: UniqueIdentifier
  cardId: UniqueIdentifier
}
