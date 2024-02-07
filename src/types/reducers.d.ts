import { UUID } from 'crypto'
import { Board, Card, List, PartialWithId } from './app'

export type ActionBoard =
  | { type: 'add list'; payload: { title: string } }
  | { type: 'remove list'; payload: { listId: UUID } }
  | { type: 'update list'; payload: { newList: PartialWithId<List> } }
  | { type: 'update lists order'; payload: { newListsOrder: UUID[] } }
  | {
      type: 'add card'
      payload: { listId: UUID; newCard: PartialWithId<Card> }
    }
  | { type: 'remove card'; payload: { listId: UUID; cardId: UUID } }
  | {
      type: 'update card'
      payload: { listId: UUID; card: PartialWithId<Card> }
    }
  | {
      type: 'update cards order'
      payload: { listId: UUID; newCardsOrder: UUID[] }
    }
  | { type: 'update board'; payload: { newBoard: PartialWithId<Board> } }
