export type ActionBoard =
  | { type: 'add list'; payload: { title: string } }
  | { type: 'remove list'; payload: { listId: ListId } }
  | { type: 'update list'; payload: { newList: PartialWithId<List> } }
  | { type: 'update lists order'; payload: { newListsOrder: ListId[] } }
  | { type: 'add card'; payload: { listId: ListId; title: string } }
  | { type: 'remove card'; payload: { listId: ListId; cardId: CardId } }
  | {
      type: 'update card'
      payload: { listId: ListId; card: PartialWithId<Card> }
    }
  | {
      type: 'update cards order'
      payload: { listId: ListId; newCardsOrder: CardId[] }
    }
  | { type: 'update board'; payload: { newBoard: PartialWithId<Board> } }
