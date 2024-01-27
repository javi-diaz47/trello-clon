'use client'

import { useBoards } from '@/Hooks/useBoards'
import { List } from './List'
import {
  DragDropContext,
  Draggable,
  DropResult,
  Droppable,
} from 'react-beautiful-dnd'
import { CardId, List as TList, ListId, Card } from '@/types/app'

export default function Board() {
  const { board, addList, updateCardsOrder, updateBoard } = useBoards()

  const handleClick = () => {
    addList('new')
  }

  const onDragEnd = (result: DropResult) => {
    const { source, destination, draggableId, type } = result

    if (!destination?.droppableId) return

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    )
      return

    // Move a list

    if (type === 'List') {
      const newListsOrder = Array.from(board.listsOrder)

      newListsOrder.splice(source.index, 1)

      newListsOrder.splice(destination.index, 0, draggableId as ListId)

      updateBoard({ id: board.id, listsOrder: newListsOrder })

      return
    }

    const startId = source.droppableId as ListId
    const endId = destination.droppableId as ListId
    const cardId = draggableId as CardId

    // Move a card in the same list

    if (startId === endId) {
      const currList = board.lists[endId]

      const newCardsOrder = Array.from(currList.cardsOrder)

      newCardsOrder.splice(source.index, 1)

      newCardsOrder.splice(destination.index, 0, cardId)

      updateCardsOrder(endId, newCardsOrder)
      return
    }

    // Move a card to another list

    //-> remove card from start list
    const startList: TList = board.lists[startId]

    const { [cardId]: removedCard, ...newStartListCards } = startList.cards

    const newStartListCardsOrder = Array.from(startList.cardsOrder)
    newStartListCardsOrder.splice(source.index, 1)

    const newStartList: TList = {
      ...startList,
      cards: newStartListCards,
      cardsOrder: newStartListCardsOrder,
    }

    // -> Adding the card to the new list
    const endList: TList = board.lists[endId]

    const newEndListCards = {
      ...endList.cards,
      [cardId]: {
        ...board.lists[startId].cards[cardId],
      },
    }

    const newEndListCardsOrder = Array.from(endList.cardsOrder)

    newEndListCardsOrder.splice(destination.index, 0, cardId)

    const newEndList: TList = {
      ...endList,
      cards: newEndListCards,
      cardsOrder: newEndListCardsOrder,
    }

    const newBoard = {
      ...board,
      lists: {
        ...board.lists,
        [startId]: newStartList,
        [endId]: newEndList,
      },
    }
    updateBoard(newBoard)
  }

  return (
    <div className="flex flex-col w-full pr-8 gap-4 overflow-hidden">
      <div className="w-full min-h-[6rem]">
        <button onClick={handleClick}>Add list</button>
      </div>
      <div className="w-full h-[calc(100vh-10rem)] p-8 grid gap-8 bg-light-gray rounded-3xl mr-16">
        <div>
          <h2 className="text-4xl font-bold ">{board.title}</h2>
        </div>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId={board.id} type="List" direction="horizontal">
            {(provided) => (
              <section
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="h-[calc(100vh-18rem)] flex  relative rounded-2xl  ">
                {board.listsOrder.map((id, i) => (
                  <Draggable key={id} draggableId={id} index={i}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        className="mr-8 ">
                        <List
                          key={id}
                          list={board.lists[id]}
                          providedDragHandleProps={provided.dragHandleProps}
                        />
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </section>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </div>
  )
}
