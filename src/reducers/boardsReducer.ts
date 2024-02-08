import { Board, Card, List } from '@/types/app'
import { ActionBoard } from '@/types/reducers'
import { genUUID } from '@/utils/genUUID'

export const boardReducer = (state: Board, action: ActionBoard): Board => {
  const { type } = action

  if (type === 'update board') {
    const { newBoard } = action.payload
    return {
      ...state,
      ...newBoard,
    }
  }

  if (type === 'update list') {
    const { newList } = action.payload

    return {
      ...state,
      lists: {
        ...state.lists,
        [newList.id]: {
          ...state.lists[newList.id],
          ...newList,
        },
      },
    }
  }

  if (type === 'update card') {
    const { listId, card } = action.payload
    const newCard = {
      ...state.lists[listId].cards[card.id],
      ...card,
    }

    const newBoard = { ...state }

    newBoard.lists[listId].cards[card.id] = newCard

    return newBoard
  }

  if (type === 'udpate labels') {
    const { newLabel } = action.payload

    const newBoard: Board = { ...state }
    const oldLabel = newBoard.labels[newLabel.id]

    newBoard.labels[newLabel.id] = { ...oldLabel, ...newLabel }

    return newBoard
  }

  if (type === 'update lists order') {
    const { newListsOrder } = action.payload

    const newBoard: Board = { ...state }

    newBoard.listsOrder = newListsOrder

    return newBoard
  }

  if (type === 'update cards order') {
    const { listId, newCardsOrder } = action.payload
    const newBoard: Board = { ...state }

    newBoard.lists[listId].cardsOrder = newCardsOrder

    return newBoard
  }

  if (type === 'add list') {
    const { title } = action.payload
    const newList: List = {
      id: genUUID(),
      title,
      cards: {},
      cardsOrder: [],
    }

    const newBoard = { ...state }

    newBoard.lists = {
      ...newBoard.lists,
      [newList.id]: newList,
    }

    newBoard.listsOrder.push(newList.id)

    return newBoard
  }

  if (type === 'add card') {
    const { listId, newCard } = action.payload

    const newBoard: Board = {
      ...state,
    }

    newBoard.lists[listId].cards = {
      ...newBoard.lists[listId].cards,
      [newCard.id]: newCard,
    }

    newBoard.lists[listId].cardsOrder.push(newCard.id)

    return newBoard
  }

  if (type === 'add label to board') {
    const { newLabel } = action.payload

    const newBoard = { ...state }

    newBoard.labels[newLabel.id] = newLabel

    return newBoard
  }

  if (type === 'remove list') {
    const { listId } = action.payload
    const { [listId]: removedList, ...newLists } = state.lists

    const newBoard: Board = {
      ...state,
      lists: newLists,
      listsOrder: state.listsOrder.filter((id) => id !== listId),
    }

    return newBoard
  }

  if (type === 'remove card') {
    const { listId, cardId } = action.payload

    const { [cardId]: removedCard, ...newCards } = state.lists[listId].cards

    const newBoard: Board = {
      ...state,
    }

    newBoard.lists[listId].cards = newCards

    newBoard.lists[listId].cardsOrder = state.lists[listId].cardsOrder.filter(
      (id) => id !== cardId
    )

    return newBoard
  }

  return state
}
