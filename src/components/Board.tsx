'use client'

import { useBoards } from '@/Hooks/useBoards'
import { List } from './List'
import { DragDropContext, DropResult } from 'react-beautiful-dnd'
import { CardId, List as TList, ListId } from '@/types/app'

export default function Board() {
  const { board, addList, updateCardsOrder } = useBoards()

  const handleClick = () => {
    addList('new')
  }

  const onDragEnd = (result: DropResult) => {
    const { source, destination, draggableId } = result

    if (!destination?.droppableId) return

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    )
      return

    // Move a card in the same list

    const currList = board.lists[destination.droppableId as ListId]

    const newCardsOrder = Array.from(currList.cardsOrder)

    newCardsOrder.splice(source.index, 1)

    newCardsOrder.splice(destination.index, 0, draggableId as CardId)

    updateCardsOrder(destination.droppableId as ListId, newCardsOrder)
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
          <section className="h-[calc(100vh-18rem)]  flex overflow-scroll relative rounded-2xl  gap-12">
            {board.listsOrder.map((id) => (
              <List key={id} list={board.lists[id]} />
            ))}
          </section>
        </DragDropContext>
      </div>
    </div>
  )
}
